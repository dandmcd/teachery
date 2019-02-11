import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    tags(cursor: String, limit: Int): TagConnection!
    tag(id: ID!): Tag!
    getTagsByName(tagname: String!): [Tag]
  }

  extend type Mutation {
    createTag(tagname: String!): Tag!
    deleteTag(id: ID!): Boolean!
  }

  type TagConnection {
    edges: [Tag!]!
    pageInfo: TagPageInfo!
  }

  type TagPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Tag {
    id: ID!
    tagname: String!
    createdAt: Date!
    decks: [Deck!]!
  }
`;
