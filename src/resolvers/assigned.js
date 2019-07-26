import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

import { isAdmin, isAuthenticated, isAssignedTaskOwner } from "./authorization";
import { UserInputError } from "apollo-server";

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    assignedTasks: combineResolvers(
      isAuthenticated,
      async (parent, { cursor, limit = 100 }, { models, me }) => {
        const cursorOptions = cursor
          ? {
              where: {
                createdAt: {
                  [Sequelize.Op.lt]: fromCursorHash(cursor)
                }
              }
            }
          : {};

        const assignedTasks = await models.AssignedTask.findAll({
          where: {
            assignedTo: me.id
          },
          order: [["createdAt", "DESC"]],
          limit: limit + 1,
          ...cursorOptions
        });

        const hasNextPage = assignedTasks.length > limit;
        const edges = hasNextPage ? assignedTasks.slice(0, -1) : assignedTasks;

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
    ),

    assignedTask: async (parent, { id }, { models }) => {
      return await models.AssignedTask.findByPk(id);
    }
  },

  Mutation: {
    assignTask: combineResolvers(
      isAdmin,
      async (
        parent,
        { assignmentId, assignedTo, dueDate, status },
        { models }
      ) => {
        const assignment = await models.Assignment.findByPk(assignmentId);
        const user = await models.User.findOne({
          where: { id: assignedTo },
          raw: true,
          returning: true
        });
        if (assignment == null) {
          throw new UserInputError(
            "No assignment found with this assignment id"
          );
        } else if (user == null) {
          throw new UserInputError("No user found with this id");
        }
        const assignedTask = await models.AssignedTask.create({
          assignmentId: assignment.id,
          assignedTo: user.id,
          dueDate,
          status
        });
        const userAssignment = await models.UserAssignment.create({
          assignmentId: assignment.id,
          assignedTaskId: assignedTask.id,
          assignedTo
        });
        return assignedTask;
      }
    )
  },

  AssignedTask: {
    assignment: async (assignedTask, args, { loaders }) => {
      console.log(assignedTask.assignmentId);
      return await loaders.assignment.load(assignedTask.assignmentId);
    }
  }
};
