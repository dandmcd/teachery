import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    """
    Get all tags
    """
    tags(cursor: String, limit: Int): TagConnection!
    """
    Get tag by id
    """
    tag(id: ID!): Tag!
    """
    Get tag by name
    """
    getTagsByName(tagName: String!): [Tag]
  }

  extend type Mutation {
    createTag(tagName: String!): Tag!
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
    """
    Tag Label
    """
    tagName: String!
    createdAt: Date!
    decks: [Deck!]!
  }
`;
