import { gql } from "apollo-server-express";

import userSchema from "./user";
import messageSchema from "./message";
import cardSchema from "./card";
import deckSchema from "./deck";
import assignmentSchema from "./assignment";
import tagSchema from "./tag";
import assignedTaskSchema from "./assigned";
import uploadSchema from "./upload";

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

export default [
  linkSchema,
  userSchema,
  messageSchema,
  cardSchema,
  deckSchema,
  assignmentSchema,
  tagSchema,
  assignedTaskSchema,
  uploadSchema
];
