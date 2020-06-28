import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";
import { UserInputError } from "apollo-server-core";

import { isAdmin, isAuthenticated, isDeckOwner } from "./authorization";

const s3Bucket = process.env.S3_BUCKET;

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    decks: async (
      parent,
      { cursor, limit = 100, showBookmarks },
      { models, me }
    ) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor)
              }
            }
          }
        : {};
      if (showBookmarks === true) {
        const decks = await models.Deck.findAll({
          order: [["createdAt", "DESC"]],
          limit: limit + 1,
          ...cursorOptions,
          include: [
            {
              model: models.User,
              as: "DeckBookmark",
              where: {
                id: me.id
              }
            }
          ]
        });
        if (decks.length === 0) {
        } else {
          const hasNextPage = decks.length > limit;
          const edges = hasNextPage ? decks.slice(0, -1) : decks;

          return {
            edges,
            pageInfo: {
              hasNextPage,
              endCursor: toCursorHash(
                edges[edges.length - 1].createdAt.toString()
              )
            }
          };
        }
      } else {
        const decks = await models.Deck.findAll({
          order: [["createdAt", "DESC"]],
          limit: limit + 1,
          ...cursorOptions
        });

        const hasNextPage = decks.length > limit;
        const edges = hasNextPage ? decks.slice(0, -1) : decks;

        return {
          edges,
          pageInfo: {
            hasNextPage,
            endCursor: toCursorHash(
              edges[edges.length - 1].createdAt.toString()
            )
          }
        };
      }
    },

    deck: async (parent, { id }, { models }) => {
      return await models.Deck.findByPk(id);
    }
  },

  Mutation: {
    createDeck: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { deckName, description, deckImageName, deckImageUrl },
        { models, me }
      ) => {
        const deck = await models.Deck.create({
          deckName,
          description,
          userId: me.id,
          deckImageName,
          deckImageUrl
        });
        return deck;
      }
    ),

    updateDeck: combineResolvers(
      isAuthenticated,
      isDeckOwner,
      async (
        parent,
        { id, deckName, description, deckImageName, deckImageUrl },
        { models, me }
      ) => {
        const deck = await models.Deck.update(
          {
            id: id,
            deckName: deckName,
            description: description,
            deckImageName: deckImageName,
            deckImageUrl: deckImageUrl
          },
          { returning: true, plain: true, validate: true, where: { id: id } }
        )
          .spread((affectedCount, affectedRows) => {
            return affectedRows;
          })
          .catch(err => {
            console.log(err);
            throw new UserInputError(err);
          });
        return deck;
      }
    ),

    bookmarkDeck: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        const deck = await models.Deck.findByPk(id);
        const bookmarkedDeck = await models.BookmarkedDeck.create({
          deckId: deck.id,
          userId: me.id
        });
        return deck;
      }
    ),

    removeBookmark: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        return await models.BookmarkedDeck.destroy({
          where: { deckId: id, userId: me.id }
        });
      }
    ),

    addTagToDeck: combineResolvers(
      isAuthenticated,
      async (parent, { id, tagName }, { models }) => {
        const deck = await models.Deck.findOne({
          where: { id }
        });
        const tag = await models.Tag.findOrCreate({
          where: {
            tagName: tagName
          }
        }).then(([tag, created]) => {
          tag.get({
            plain: true
          });
          return tag;
        });

        const deckTag = await models.DeckTag.create({
          tagId: tag.id,
          deckId: deck.id
        });
        return deck;
      }
    ),

    removeTagFromDeck: combineResolvers(
      isAdmin,
      async (parent, { id, tagId }, { models }) => {
        return await models.DeckTag.destroy({
          where: { deckId: id, tagId: tagId }
        });
      }
    ),

    deleteDeck: combineResolvers(
      isDeckOwner,
      async (parent, { id }, { models }) => {
        await models.Card.destroy({
          where: {
            deckId: id
          }
        });
        await models.BookmarkedDeck.destroy({
          where: { deckId: id }
        });
        await models.DeckTag.destroy({
          where: { deckId: id }
        });
        return await models.Deck.destroy({
          where: { id }
        });
      }
    )
  },

  Deck: {
    cards: async (deck, args, { models }) => {
      return await models.Card.findAll({
        where: {
          deckId: deck.id
        }
      });
    },

    tags: async (deck, args, { models }) => {
      return await models.Tag.findAll({
        include: [
          {
            model: models.Deck,
            where: {
              id: deck.id
            }
          }
        ]
      });
    },

    users: async (deck, args, { models }) => {
      return await models.User.findAll({
        include: [
          {
            model: models.Deck,
            as: "DeckBookmark",
            where: {
              deckId: deck.id
            }
          }
        ]
      });
    },

    user: async (deck, args, { loaders }) => {
      return await loaders.user.load(deck.userId);
    }
  }
};
