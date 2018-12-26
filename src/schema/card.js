import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    cards(cursor: String, limit: Int): CardConnection!
    card(id: ID!): Card!
  }

  type CardConnection {
    edges: [Card!]!
    pageInfo: PageInfo!
  }

  type CardPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Card {
    id: ID!
    front: String!
    back: String
    createdAt: Date!
    deck: Deck!
  }
`;
