import gql from "graphql-tag";

export const UPDATE_ASSIGNED_TASK = gql`
  mutation(
    $id: ID!
    $assignedTo: String!
    $dueDate: String!
    $status: Status!
    $updatedDocumentName: String
    $updatedDocumentUrl: String
  ) {
    updateAssignedTask(
      id: $id
      assignedTo: $assignedTo
      dueDate: $dueDate
      status: $status
      updatedDocumentName: $updatedDocumentName
      updatedDocumentUrl: $updatedDocumentUrl
    ) {
      id
      assignedTo
      dueDate
      status
      updatedDocumentName
      updatedDocumentUrl
    }
  }
`;

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

export const S3SIGNMUTATION = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
