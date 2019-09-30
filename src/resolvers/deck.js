import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

import { isAdmin, isAuthenticated } from "./authorization";

const s3Bucket = process.env.S3_BUCKET;

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    decks: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor)
              }
            }
          }
        : {};

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
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      };
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

    addTagToDeck: combineResolvers(
      isAdmin,
      async (parent, { id, tagName }, { models }) => {
        const deck = await models.Deck.findOne({
          where: { id }
        });
        const tag = await models.Tag.findOrCreate({
          where: {
            tagName: tagName
          }
        }).then(([tag, created]) => {
          console.log(
            tag.get({
              plain: true
            })
          );
          console.log(created);
          return tag;
        });
        const deckTag = await models.DeckTag.create({
          tagId: tag.id,
          deckId: deck.id
        });
        return deck;
      }
    ),

    deleteDeck: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        await models.Card.destroy({
          where: {
            deckId: id
          }
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

    user: async (deck, args, { models }) => {
      return await models.User.findByPk(deck.userId);
    }
  }
};
