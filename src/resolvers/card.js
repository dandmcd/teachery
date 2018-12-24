import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    allCards: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor)
              }
            }
          }
        : {};

      const allCards = await models.Card.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        ...cursorOptions
      });

      const hasNextPage = allCards.length > limit;
      const edges = hasNextPage ? allCards.slice(0, -1) : allCards;

      return {
        edges,
        CardPageInfo: {
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
    user: async (message, args, { loaders }) => {
      return await loaders.user.load(card.userId);
    }
  }
};
