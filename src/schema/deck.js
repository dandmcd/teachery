import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    decks(cursor: String, limit: Int): DeckConnection!
    deck(id: ID): Deck!
  }

  type DeckConnection {
    edges: [Deck!]!
    pageInfo: DeckPageInfo!
  }

  type DeckPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Deck {
    id: ID!
    name: String!
    createdAt: Date!
    user: User!
    cards: [Card!]
  }
`;
