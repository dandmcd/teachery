import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    toggleLanding: Int
    togglePopup: Boolean!
    toggleAddCard: Boolean!
    toggleAddTag: Boolean!
    toggleAssign: Boolean!
    toggleSuccess: Boolean!
    toggleDeleteSuccess: Boolean!
    toggleRoleChange: Boolean!
    isCard: Boolean!
    isDeck: Boolean!
    isDocument: Boolean!
    assignmentId: Int
  }
  extend type Search {
    id: Int!
    tagName: String!
    showPopup: Boolean!
    noResult: Boolean!
    tags: [String]
  }
`;

export const resolvers = {};
