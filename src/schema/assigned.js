import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    assignedTasks(cursor: String, limit: Int): AssignedTaskConnection!

    assignedTask(id: ID!): AssignedTask!
  }

  extend type Mutation {
    assignTask(
      assignmentId: Int!
      assignedTo: Int!
      dueDate: String!
      status: Status!
    ): AssignedTask!
  }

  enum Status {
    INCOMPLETE
    COMPLETE
    REVIEWING
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

  type AssignedTask {
    id: ID!
    """
    User the task is assigned to
    """
    assignedTo: Int!

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
    createdAt: Date!
    assignment: Assignment!
  }
`;
