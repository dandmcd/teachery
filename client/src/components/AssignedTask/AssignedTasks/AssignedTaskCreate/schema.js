import gql from "graphql-tag";

export const STATUS_ENUM = gql`
  query {
    __type(name: "Status") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const CREATE_ASSIGNED_TASK = gql`
  mutation(
    $assignmentId: Int!
    $assignedTo: String!
    $dueDate: String!
    $status: Status!
  ) {
    assignTask(
      assignmentId: $assignmentId
      assignedTo: $assignedTo
      dueDate: $dueDate
      status: $status
    ) {
      id
      assignmentId
      status
      dueDate
      createdAt
      assignedTo
      assignedToName
      updatedDocumentName
      updatedDocumentUrl
      user {
        id
        username
      }
      assignment {
        id
        assignmentName
        note
        link
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;
