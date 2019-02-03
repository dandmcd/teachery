import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    assignments(cursor: String, limit: Int): AssignmentConnection!
    assignment(id: ID!): Assignment!
  }

  extend type Mutation {
    """
    Creates an assignment -
    Assignment name is required!
    """
    createAssignment(
      assignment_name: String!
      description: String
      url: String
    ): Assignment!

    """
    Delete an assignment
    """
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

    """
    Name of assignment
    """
    assignment_name: String!

    """
    Notes and/or instructions for assignment
    """
    description: String

    """
    URL link
    """
    url: String

    createdAt: Date!
    user: User!
  }
`;
