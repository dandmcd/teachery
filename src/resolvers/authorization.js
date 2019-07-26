import { ForbiddenError } from "apollo-server";
import { combineResolvers, skip } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin.")
);

export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findByPk(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as message owner.");
  }

  return skip;
};

export const isAssignmentOwner = async (parent, { id }, { models, me }) => {
  const assignment = await models.Assignment.findByPk(id, { raw: true });

  if (assignment.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as assignment owner.");
  }

  return skip;
};
