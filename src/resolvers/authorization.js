import Sequelize from "sequelize";
import { ForbiddenError } from "apollo-server";
import { combineResolvers, skip } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin.")
);

export const isTeacher = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === "TEACHER" || "ADMIN"
      ? skip
      : new ForbiddenError("Not authorized as teacher.")
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

export const isDeckOwner = async (parent, { id }, { models, me }) => {
  const deck = await models.Deck.findByPk(id, { raw: true });
  if (me.role === "ADMIN") {
    return skip;
  }
  if (deck.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as deck owner.");
  }
  return skip;
};

export const isCardOwner = async (parent, { deckId }, { models, me }) => {
  const deck = await models.Deck.findByPk(deckId, { raw: true });
  if (me.role === "ADMIN") {
    return skip;
  }
  if (deck.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as deck owner.");
  }
  return skip;
};
