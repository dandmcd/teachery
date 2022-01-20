import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

import {
  isAuthenticated,
  isAssignedTaskOwner,
  isTeacher,
} from "./authorization";

import { UserInputError } from "apollo-server";
import moment from "moment";
import assignedTask from "../models/assigned";

const toCursorHash = (string) => Buffer.from(string).toString("base64");

const fromCursorHash = (string) =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    notes: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {};

      const notes = await models.Note.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = notes.length > limit;
      const edges = hasNextPage ? notes.slice(0, -1) : notes;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
        },
      };
    },
    note: async (parent, { id }, { models }) => {
      return await models.Note.findByPk(id);
    },
  },

  Mutation: {
    createNote: combineResolvers(
      isAuthenticated,
      async (parent, { assignedTaskId, text }, { models, me }) => {
        const note = await models.Note.create({
          assignedTaskId,
          userId: me.id,
          text,
        });
        return note;
      }
    ),
    deleteNote: combineResolvers(
      isAuthenticated,
      async (parent, { id, assignedTaskId }, { models }) => {
        return await models.Note.destroy({
          where: { id },
          isTeacher,
        });
      }
    ),
  },

  Note: {
    assignedTask: async (note, args, { loaders }) => {
      return await loaders.assignedTask.load(assignedTask.assignedTaskId);
    },
    user: async (note, args, { loaders }) => {
      return await loaders.user.load(note.userId);
    },
  },
};
