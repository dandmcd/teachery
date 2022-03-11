import { GraphQLDateTime } from "graphql-iso-date";

import userResolvers from "../resolvers/user";
import messageResolvers from "../resolvers/message";
import cardResolvers from "../resolvers/card";
import deckResolvers from "../resolvers/deck";
import assignmentResolvers from "../resolvers/assignment";
import tagResolvers from "../resolvers/tag";
import assignedTaskResolvers from "./assigned";
import uploadResolvers from "./upload";
import noteResolvers from "./note";

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  cardResolvers,
  deckResolvers,
  assignmentResolvers,
  tagResolvers,
  assignedTaskResolvers,
  uploadResolvers,
  noteResolvers,
];
