import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    """
    Get all assignments
    """
    assignments(cursor: String, limit: Int): AssignmentConnection!
    """
    Get assignment by id
    """
    assignment(id: ID!): Assignment!
  }

  extend type Mutation {
    """
    Creates an assignment -
    Assignment name is required!
    """
    createAssignment(
      assignmentName: String!
      note: String
      link: String
      documentName: String
      documentUrl: String
    ): Assignment!

    """
    Update an existing assignment -
    Assignment name is required!
    """
    updateAssignment(
      id: ID!
      assignmentName: String!
      note: String
      link: String
      documentName: String
      documentUrl: String
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
    assignmentName: String!

    """
    Notes and/or instructions for assignment
    """
    note: String

    """
    A URL link related to the assignment
    """
    link: String
    documentName: String
    documentUrl: String
    createdAt: Date!
    user: User!
    assignedTasks: [AssignedTask!]!
  }
`;
