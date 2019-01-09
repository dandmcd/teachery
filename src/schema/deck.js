import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    decks(cursor: String, limit: Int): DeckConnection!
    deck(id: ID, deckName: String): Deck!
  }

  extend type Mutation {
    createDeck(name: String!): Deck!
    deleteDeck(id: ID!): Boolean!
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
    deckName: String!
    createdAt: Date!
    user: User!
    cards: [Card!]
  }
`;
