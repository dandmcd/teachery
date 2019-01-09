import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    assignments(cursor: String, limit: Int): AssignmentConnection!
    assignment(id: ID!): Assignment!
  }

  extend type Mutation {
    createAssignment(
      assignment_name: String!
      description: String
      url: String
    ): Assignment!
    deleteAssignment(id: ID!): Boolean!
  }

  type AssignmentConnection {
    edges: [Assignment!]!
    pageInfo: PageInfo!
  }

  type AssignmentPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Assignment {
    id: ID!
    assignment_name: String!
    description: String
    url: String
    createdAt: Date!
    user: User!
  }

  extend type Subscription {
    assignmentCreated: AssignmentCreated!
  }

  type AssignmentCreated {
    assignment: Assignment!
  }
`;
