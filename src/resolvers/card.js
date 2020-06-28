import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

import {
  isAdmin,
  isAuthenticated,
  isCardOwner,
  isDeckOwner,
} from "./authorization";
import { UserInputError } from "apollo-server";
import { validate } from "graphql";

const toCursorHash = (string) => Buffer.from(string).toString("base64");

const fromCursorHash = (string) =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    cards: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {};

      const cards = await models.Card.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = cards.length > limit;
      const edges = hasNextPage ? cards.slice(0, -1) : cards;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
        },
      };
    },
    card: async (parent, { id }, { models }) => {
      return await models.Card.findByPk(id);
    },
  },

  Mutation: {
    createCard: combineResolvers(
      isAuthenticated,
      isCardOwner,
      async (
        parent,
        { deckId, front, back, pictureName, pictureUrl },
        { models }
      ) => {
        const card = await models.Card.create({
          deckId,
          front,
          back,
          pictureName,
          pictureUrl,
        });
        return card;
      }
    ),

    updateCard: combineResolvers(
      isAuthenticated,
      isCardOwner,
      async (
        parent,
        { id, deckId, front, back, pictureName, pictureUrl },
        { models }
      ) => {
        const card = await models.Card.update(
          {
            id: id,
            deckId: deckId,
            front: front,
            back: back,
            pictureName: pictureName,
            pictureUrl: pictureUrl,
          },
          { returning: true, plain: true, validate: true, where: { id: id } }
        )
          .spread((affectedCount, affectedRows) => {
            return affectedRows;
          })
          .catch((err) => {
            console.log(err);
            throw new UserInputError(err);
          });
        return card;
      }
    ),

    deleteCard: combineResolvers(
      isAuthenticated,
      isCardOwner,
      async (parent, { id, deckId }, { models }) => {
        return await models.Card.destroy({
          where: { id },
        });
      }
    ),
  },

  Card: {
    deck: async (card, args, { loaders }) => {
      return await loaders.deck.load(card.deckId);
    },
  },
};
