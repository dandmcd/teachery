import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";

import { isAuthenticated, isTeacher } from "./authorization";
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
                assignedTo: me.id,
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
        if (assignedTasks.length === 0) {
          return null;
        } else {
          const hasNextPage = assignedTasks.length > limit;
          const edges = hasNextPage
            ? assignedTasks.slice(0, -1)
            : assignedTasks;

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
      }
    ),

    assignedTasksTeacher: combineResolvers(
      isAuthenticated,
      async (parent, { cursor, limit = 100, isTeacher }, { models, me }) => {
        const cursorOptions = cursor
          ? {
              where: {
                userId: me.id,
                createdAt: {
                  [Sequelize.Op.lt]: fromCursorHash(cursor)
                }
              }
            }
          : {};
        const assignedTasks = await models.AssignedTask.findAll({
          where: {
            userId: me.id
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
      isTeacher,
      async (
        parent,
        { assignmentId, assignedTo, dueDate, status },
        { models, me }
      ) => {
        const assignment = await models.Assignment.findByPk(assignmentId);
        const user = await models.User.findOne({
          where: {
            [Sequelize.Op.or]: [{ email: assignedTo }, { username: assignedTo }]
          },
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
          assignedToName: user.username,
          userId: me.id,
          dueDate,
          status
        });
        const userAssignment = await models.UserAssignment.create({
          assignmentId: assignment.id,
          assignedTaskId: assignedTask.id,
          assignedToName: user.username,
          assignedTo //Do we need this?
        });
        return assignedTask;
      }
    ),

    updateAssignedTask: combineResolvers(
      isTeacher,
      async (
        parent,
        {
          id,
          assignmentId,
          assignedTo,
          dueDate,
          status,
          updatedDocumentName,
          updatedDocumentUrl
        },
        { models }
      ) => {
        const assignedTask = await models.AssignedTask.update(
          {
            id: id,
            assignmentId: assignmentId,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
            updatedDocumentName: updatedDocumentName,
            updatedDocumentUrl: updatedDocumentUrl
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
        return assignedTask;
      }
    ),

    uploadUpdatedDocument: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { id, status, updatedDocumentName, updatedDocumentUrl },
        { models }
      ) => {
        const assignedTask = await models.AssignedTask.update(
          {
            id: id,
            status: status,
            updatedDocumentName: updatedDocumentName,
            updatedDocumentUrl: updatedDocumentUrl
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
        return assignedTask;
      }
    ),
    deleteAssignedTask: combineResolvers(
      isTeacher,
      async (parent, { id }, { models }) => {
        await models.UserAssignment.destroy({
          where: { assignedTaskId: id }
        });
        return await models.AssignedTask.destroy({
          where: {
            id: id
          }
        });
      }
    )
  },

  AssignedTask: {
    assignment: async (assignedTask, args, { loaders }) => {
      return await loaders.assignment.load(assignedTask.assignmentId);
    },
    user: async (assignedTask, args, { loaders }) => {
      return await loaders.user.load(assignedTask.userId);
    }
  }
};
