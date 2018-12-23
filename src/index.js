import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import jwt from "jsonwebtoken";
import DataLoader from "dataloader";
import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";
import loaders from "./loaders";

const app = express();

app.use(cors());

app.use(morgan("dev"));

const getMe = async req => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");

    return {
      ...error,
      message
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      };
    }
  }
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const isTest = !!process.env.DATABASE;
const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 8000;
//For production, change sync force: isTest || isProduction
// const eraseDatabaseOnSync = true;

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  if (isTest || isProduction) {
    createUsersWithMessagesAndCards(new Date());
  }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});

const createUsersWithMessagesAndCards = async date => {
  await models.User.create(
    {
      username: "dandmcd",
      email: "dandmcd@gmail.com",
      password: "hotpot123",
      role: "ADMIN",
      messages: [
        {
          text: "I am super!",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Message]
    }
  ).then(user => {
    models.Card.create(
      {
        front: "Hello",
        back: "Nihao",
        createdAt: date.setSeconds(date.getSeconds() + 1),
        userId: 1
      },
      {
        front: "Let's go",
        back: "Bears",
        createdAt: date.setSeconds(date.getSeconds() + 1),
        userId: 1
      }
    );
  });

  await models.User.create(
    {
      username: "hotpot",
      email: "cat@dog.com",
      password: "katkat111",
      messages: [
        {
          text: "I am a cat...",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          text: "The cutest cat",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ],
      allCards: [
        {
          front: "Bingo!",
          back: "Was his nameo",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};
