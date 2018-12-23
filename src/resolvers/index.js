import { GraphQLDateTime } from "graphql-iso-date";

import userResolvers from "../resolvers/user";
import messageResolvers from "../resolvers/message";
import cardResolvers from "../resolvers/card";

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  cardResolvers
];
