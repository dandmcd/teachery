import gql from "graphql-tag";

export const CREATE_ASSIGNMENT = gql`
  mutation(
    $assignmentName: String!
    $note: String
    $link: String
    $documentName: String
    $documentUrl: String
  ) {
    createAssignment(
      assignmentName: $assignmentName
      note: $note
      link: $link
      documentName: $documentName
      documentUrl: $documentUrl
    ) {
      id
      assignmentName
      note
      link
      documentName
      documentUrl
      createdAt
      user {
        id
        username
      }
      assignedTasks {
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
