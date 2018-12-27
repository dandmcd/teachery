import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

import { isAdmin, isAuthenticated } from "./authorization";

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
      return await models.Deck.findById(id);
    }
  },

  Mutation: {
    createDeck: combineResolvers(
      isAdmin,
      isAuthenticated,
      async (parent, { name }, { models, me }) => {
        const deck = await models.Deck.create({
          name,
          userId: me.id
        });
        return deck;
      }
    ),

    deleteDeck: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
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

    user: async (deck, args, { models }) => {
      return await models.User.findById(deck.userId);
    }
  }
};
