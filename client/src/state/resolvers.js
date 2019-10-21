import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    toggleLanding: Boolean!
    togglePopup: Boolean!
    toggleSuccess: Boolean!
    isCard: Boolean!
    isDeck: Boolean!
    toggleAddCard: Boolean!
    toggleAddTag: Boolean!
  }
`;

export const resolvers = {};