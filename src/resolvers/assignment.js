import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";
import {
  isAuthenticated,
  isAssignmentOwner,
  isTeacher,
  isAdmin
} from "./authorization";

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    assignments: combineResolvers(
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

        const assignments = await models.Assignment.findAll({
          where: {
            userId: me.id
          },
          order: [["createdAt", "DESC"]],
          limit: limit + 1,
          ...cursorOptions
        });
        const hasNextPage = assignments.length > limit;
        const edges = hasNextPage ? assignments.slice(0, -1) : assignments;

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

    assignment: async (parent, { id }, { models }) => {
      return await models.Assignment.findByPk(id);
    }
  },

  Mutation: {
    createAssignment: combineResolvers(
      isAuthenticated,
      isTeacher,
      async (
        parent,
        { assignmentName, note, link, documentName, documentUrl },
        { models, me }
      ) => {
        if (link === "") {
          link = null;
        }
        const assignment = await models.Assignment.create({
          assignmentName,
          note,
          link,
          documentName,
          documentUrl,
          userId: me.id
        });
        return assignment;
      }
    ),

    updateAssignment: combineResolvers(
      isTeacher,
      async (
        parent,
        { id, assignmentName, note, link, documentName, documentUrl },
        { models }
      ) => {
        if (link === "") {
          link = null;
        }
        const assignment = await models.Assignment.update(
          {
            id: id,
            assignmentName: assignmentName,
            note: note,
            link: link,
            documentName: documentName,
            documentUrl: documentUrl
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
        return assignment;
      }
    ),

    deleteAssignment: combineResolvers(
      isAuthenticated,
      isAssignmentOwner,
      async (parent, { id }, { models }) => {
        await models.AssignedTask.destroy({
          where: {
            assignmentId: id
          }
        });
        await models.UserAssignment.destroy({
          where: {
            assignmentId: id
          }
        });

        return await models.Assignment.destroy({ where: { id } });
      }
    )
  },

  Assignment: {
    assignedTasks: async (assignment, args, { models }) => {
      return await models.AssignedTask.findAll({
        include: [
          {
            model: models.Assignment,
            where: {
              id: assignment.id
            }
          }
        ]
      });
    },

    user: async (assignment, args, { loaders }) => {
      return await loaders.user.load(assignment.userId);
    }
  }
};
