import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";
import { UserInputError, AuthenticationError } from "apollo-server-core";

import { isAdmin } from "./authorization";
import { decorateWithLogger } from "graphql-tools";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn
  });
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findByPk(me.id);
    }
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password, role },
      { models, secret }
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
        role: "STUDENT"
      });

      return { token: createToken(user, secret, "120m") };
    },

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with this username.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }
      return { token: createToken(user, secret, "120m") };
    },

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id }
        });
      }
    ),

    updateUserRole: combineResolvers(
      isAdmin,
      async (parent, { id, username, password, email, role }, { models }) => {
        const user = await models.User.update(
          {
            id: id,
            role: role,
            email: email
          },
          { returning: true, validate: true, where: { email: email } }
        )
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
            throw new UserInputError(err);
          });
        return true;
      }
    )
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id
        }
      });
    },
    decks: async (user, args, { models }) => {
      return await models.Deck.findAll({
        where: {
          userId: user.id
        }
      });
    },
    assignments: async (user, args, { models }) => {
      return await models.Assignment.findAll({
        where: {
          userId: user.id
        }
      });
    },
    assignedTasks: async (user, args, { models }) => {
      return await models.AssignedTask.findAll({
        where: {
          assignedTo: user.id
        }
      });
    }
  }
};
