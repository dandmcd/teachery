import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

import { isAdmin, isAuthenticated } from "./authorization";
import { sequelize } from "../models/index";

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    tags: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor)
              }
            }
          }
        : {};

      const tags = await models.Tag.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        ...cursorOptions
      });

      const hasNextPage = tags.length > limit;
      const edges = hasNextPage ? tags.slice(0, -1) : tags;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      };
    },
    tag: async (parent, { id }, { models }) => {
      return await models.Tag.findById(id);
    },
    getTagsByName: async (parent, { tagname }, { models }) => {
      return await models.Tag.findAll({
        include: [models.Deck],
        where: {
          tagname: {
            [Sequelize.Op.iLike]: "%" + tagname + "%"
          }
        }
      });
    }
  },

  Mutation: {
    createTag: combineResolvers(
      isAdmin,
      async (parent, { tagname }, { models }) => {
        const tag = await models.Tag.create({
          tagname
        });
        return tag;
      }
    ),

    deleteTag: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
      return await models.Tag.destroy({
        where: { id }
      });
    })
  },

  Tag: {
    decks: async (tag, args, { models }) => {
      return await models.Deck.findAll({
        include: [
          {
            model: models.Tag,
            where: {
              id: tag.id
            }
          }
        ]
      });
    }
  }
};
