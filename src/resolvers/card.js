import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    cards: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor)
              }
            }
          }
        : {};

      const cards = await models.Card.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        ...cursorOptions
      });

      const hasNextPage = cards.length > limit;
      const edges = hasNextPage ? cards.slice(0, -1) : cards;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      };
    },
    card: async (parent, { id }, { models }) => {
      return await models.Card.findById(id);
    }
  },

  Card: {
    deck: async (card, args, { models }) => {
      return await models.Deck.findById(card.deckId);
    }
  }
};
