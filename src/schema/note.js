import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    notes(cursor: String, limit: Int): NoteConnection!
    note(id: ID!): Note!
  }

  extend type Mutation {
    createNote(assignedTaskId: Int!, text: String!): Note!
    deleteNote(id: ID!, assignedTaskId: Int!): Boolean!
  }

  type NoteConnection {
    edges: [Note!]!
    pageInfo: PageInfo!
  }

  type NotePageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Note {
    id: ID!
    text: String!
    createdAt: Date!
    user: User!
    assignedTask: AssignedTask!
  }
`;
