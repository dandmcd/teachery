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
import path from "path";

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
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models)),
          deck: new DataLoader(keys => loaders.deck.batchDecks(keys, models)),
          assignment: new DataLoader(keys =>
            loaders.assignment.Assignments(keys, models)
          )
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
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models)),
          deck: new DataLoader(keys => loaders.deck.batchDecks(keys, models)),
          assignment: new DataLoader(keys =>
            loaders.assignment.batchAssignments(keys, models)
          )
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

console.log("Server is running in production? " + isProduction);

httpServer.listen({ port }, () => {
  console.log(`Apollo Server on port:${port}!`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}
