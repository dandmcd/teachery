import { gql } from "apollo-server-express";

import userSchema from "./user";
import messageSchema from "./message";
import cardSchema from "./card";
import deckSchema from "./deck";

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema, cardSchema, deckSchema];
