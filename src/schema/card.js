import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allCards: [Card!]!
    card(id: ID!): Card
  }

  type Card {
    id: ID!
    front: String!
    back: String
    createdAt: Date!
    user: User!
  }
`;
