import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    decks(cursor: String, limit: Int): DeckConnection!
    deck(id: ID, deckName: String): Deck!
  }

  extend type Mutation {
    """
    Creates a deck -
    Deck name is required is required!
    """
    createDeck(deckName: String!): Deck!

    """
    Deletes a deck
    """
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

    """
    Name of the deck
    """
    deckName: String!
    createdAt: Date!
    user: User!
    cards: [Card!]
  }
`;
