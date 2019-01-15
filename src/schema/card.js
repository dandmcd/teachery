import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    cards(cursor: String, limit: Int): CardConnection!
    card(id: ID!): Card!
  }

  extend type Mutation {
    """
    Creates a card to insert in a deck -
    Deck id and front-facing card text are required!
    """
    createCard(deckId: Int!, front: String!, back: String): Message!

    """
    Deletes a card
    """
    deleteCard(id: ID!): Boolean!
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

    """
    Front-facing card text
    """
    front: String!

    """
    Back-facing card text
    """
    back: String

    createdAt: Date!
    deck: Deck!
  }
`;
