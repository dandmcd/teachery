import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    assignedTasks(cursor: String, limit: Int): AssignedTaskConnection

    assignedTasksTeacher(
      cursor: String
      limit: Int
    ): AssignedTaskTeacherConnection!

    assignedTask(id: ID!): AssignedTask!
  }

  extend type Mutation {
    assignTask(
      assignmentId: Int!
      assignedTo: String!
      dueDate: String!
      status: Status!
    ): AssignedTask!

    updateAssignedTask(
      id: ID!
      assignmentId: Int
      assignedTo: String
      dueDate: String
      status: Status
      updatedDocumentName: String
      updatedDocumentUrl: String
    ): AssignedTask!

    uploadUpdatedDocument(
      id: ID!
      status: Status!
      updatedDocumentName: String
      updatedDocumentUrl: String
    ): AssignedTask!

    deleteAssignedTask(id: ID!): Boolean!
  }

  enum Status {
    INCOMPLETE
    COMPLETE
    SUBMITTED
    GRADED
  }

  type AssignedTaskConnection {
    edges: [AssignedTask!]!
    pageInfo: AssignedTaskPageInfo!
  }

  type AssignedTaskPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type AssignedTaskTeacherConnection {
    edges: [AssignedTask!]!
    pageInfo: AssignedTaskTeacherPageInfo!
  }

  type AssignedTaskTeacherPageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type AssignedTask {
    id: ID!
    """
    User the task is assigned to
    """
    assignedTo: String!

    """
    Date when the assignment is due
    Use the format YEAR-MONTH-DAY - 2020-04-20
    """
    dueDate: String!
    """
    Status of the assignment
    Can only use values INCOMPLETE, COMPLETE, REVIEWING, GRADED
    """
    status: Status!
    assignmentId: Int!
    """
    Email or user ID to assign task to
    """
    assignedToName: String!
    updatedDocumentName: String
    updatedDocumentUrl: String
    createdAt: Date!
    user: User!
    assignment: Assignment!
  }
`;
