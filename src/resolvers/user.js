import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";
import { UserInputError, AuthenticationError } from "apollo-server-core";

import { isAuthenticated, isAdmin } from "./authorization";
import { sendNewUserEmail } from "../utilities/sendNewUserEmail";
import { sendChangeEmail } from "../utilities/sendChangeEmail";

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

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
    },
    bookmarkedDecks: async (
      parent,
      { cursor, limit = 100 },
      { models, me }
    ) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor)
              }
            }
          }
        : {};

      const bookmarkedDecks = await models.Deck.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        ...cursorOptions,
        include: [
          {
            model: models.User,
            as: "DeckBookmark",
            where: {
              id: me.id
            }
          }
        ]
      });
      const hasNextPage = bookmarkedDecks.length > limit;
      const edges = hasNextPage
        ? bookmarkedDecks.slice(0, -1)
        : bookmarkedDecks;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      };
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

      const userId = user.id;

      const token = jwt.sign({ userId, email }, secret, { expiresIn: 3600 });
      console.log(token);
      await sendNewUserEmail(
        email,
        `http://localhost:3000/account/confirm/${token}`
      );

      return { token: createToken(user, secret, "120m") };
    },

    confirmUser: async (parent, { token }, { models, secret }) => {
      let decode;
      const payload = jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          throw new AuthenticationError(
            "This token has expired. Please try to sign-in again"
          );
        }
        decode = decoded;
      });
      console.log(decode);
      if (!decode.userId) {
        return false;
      }

      const user = await models.User.update(
        {
          confirmed: true
        },
        { returning: true, validate: true, where: { id: decode.userId } }
      )
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
          throw new UserInputError(err);
        });
      return true;
    },

    forgotPassword: async (parent, { email }, { models, secret }) => {
      const user = await models.User.findOne({ where: { email } });

      if (!user) {
        throw new UserInputError("No user associated with this email address");
      }
      const userId = user.id;

      const token = jwt.sign({ userId, email }, secret, { expiresIn: 3600 });
      console.log(token);
      await sendChangeEmail(
        email,
        `http://localhost:3000/account/reset/${token}`
      );

      // await sendEmail(email, `http://localhost:3000/account/reset/${token}`);

      return true;
    },

    resetPassword: async (parent, { token }, { models, secret }) => {
      let decode;
      const payload = jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          throw new AuthenticationError(
            "This token has expired. If you wish to reset your password, please re-enter your email address or username in the form below"
          );
        }
        decode = decoded;
      });
      console.log(decode);
      const user = await models.User.findByPk(decode.userId);

      if (!decode) {
        throw new AuthenticationError("This token has expired.");
      } else if (!user) {
        throw new AuthenticationError("This user does not exist.");
      }

      return true;
    },

    changePassword: async (parent, { token, password }, { models, secret }) => {
      let decode;
      const payload = jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          throw new AuthenticationError(
            "This token has expired. If you wish to reset your password, please re-enter your email address or username in the form below"
          );
        }
        decode = decoded;
      });
      const newPassword = await bcrypt.hash(password, 10);

      const user = await models.User.update(
        {
          password: newPassword
        },
        { where: { id: decode.userId } }
      );

      return { token: createToken(user, secret, "120m") };
    },

    changePasswordLoggedIn: combineResolvers(
      isAuthenticated,
      async (parent, { id, password }, { models, secret }) => {
        const newPassword = await bcrypt.hash(password, 10);
        console.log("New  password" + " " + newPassword);

        const user = await models.User.update(
          {
            password: newPassword
          },
          { returning: true, validate: true, where: { id: id } }
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
    ),

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with this username.");
      }
      if (!user.confirmed) {
        const userId = user.id;
        const email = user.email;

        const token = jwt.sign({ userId, email }, secret, { expiresIn: 3600 });
        console.log(token);
        await sendNewUserEmail(
          email,
          `http://localhost:3000/account/confirm/${token}`
        );
        throw new AuthenticationError(
          "You have not confirmed your account.  Another confirmation has already been sent to your email address."
        );
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
    },
    bookmarkedDecks: async (user, args, { models }) => {
      return await models.Deck.findAll({
        include: [
          {
            model: models.User,
            as: "DeckBookmark",
            where: {
              id: user.id
            }
          }
        ]
      });
    }
  }
};
