import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

export default {
  Query: {
    allCards: async (parent, args, { models }) => {
      return await models.Card.findAll();
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
