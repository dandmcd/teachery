import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    toggleLanding: Boolean!
    togglePopup: Boolean!
    toggleSuccess: Boolean!
    isCard: Boolean!
    isDeck: Boolean!
    isAddCardActive: Boolean!
    isAddTagActive: Boolean!
  }
`;

export const resolvers = {};
