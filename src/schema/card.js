import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    """
    Get all cards
    """
    cards(cursor: String, limit: Int): CardConnection!
    """
    Get card by id
    """
    card(id: ID!): Card!
  }

  extend type Mutation {
    """
    Creates a card to insert in a deck -
    Deck id and front-facing card text are required!
    """
    createCard(
      deckId: Int!
      front: String!
      back: String
      pictureName: String
      pictureUrl: String
    ): Card!

    """
    Deletes a card
    """
    deleteCard(id: ID!): Boolean!
    """
    Edit a card
    """
    updateCard(
      id: ID!
      front: String!
      back: String
      pictureName: String
      pictureUrl: String
    ): Card!
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
    pictureName: String
    pictureUrl: String
    createdAt: Date!
    deck: Deck!
    user: User!
  }
`;
