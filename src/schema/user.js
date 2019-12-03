import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    """
    Get all users
    """
    users: [User!]
    """
    Get user by id
    """
    user(id: ID!): User
    me: User
    """
    Get bookmarked decks
    """
    bookmarkedDecks(cursor: String, limit: Int): DeckConnection!
  }

  extend type Mutation {
    """
    Sign up a new account
    Username, email and password are required!
    """
    signUp(username: String!, email: String!, password: String!): Token!

    """
    Sign in to account
    Token and password are required!
    """
    signIn(login: String!, password: String!): Token!

    """
    Delete user
    Requires ADMIN role
    """
    deleteUser(id: ID!): Boolean!

    """
    Update a user
    Requires ADMIN role
    """
    updateUserRole(id: ID, email: String, role: Role): Boolean!
    """
    Bookmark deck
    """
    bookmarkDeck(id: ID!): Deck!
    """
    Remove bookmark for a deck
    """
    removeBookmark(id: ID!): Boolean!
  }

  enum Role {
    STUDENT
    TEACHER
    ADMIN
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!

    """
    User level -
    Currently only 1 role used, ADMIN
    """
    role: Role
    messages: [Message!]
    assignments: [Assignment!]
    assignedTasks: [AssignedTask!]
    decks: [Deck!]
    bookmarkedDecks: [Deck!]!
  }
`;
