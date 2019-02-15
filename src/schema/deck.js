import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    """
    Get all decks
    """
    decks(cursor: String, limit: Int): DeckConnection!
    """
    Get deck by ID (deckName not yet enabled)
    """
    deck(id: ID, deckName: String): Deck!
    """
    Get all decks with tags (Depreciated)
    """
    decksWithTags: [Deck!]!
  }

  extend type Mutation {
    """
    Creates a deck -
    Deck name is required!
    """
    createDeck(deckName: String!, description: String!): Deck!
    """
    Deletes a deck
    """
    deleteDeck(id: ID!): Boolean!
    """
    Add tag to deck
    """
    addTagToDeck(id: ID!, tagName: String!): Deck!
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

    """
    Description of the deck
    """
    description: String!
    createdAt: Date!
    user: User!
    cards: [Card!]
    tags: [Tag!]!
  }
`;
