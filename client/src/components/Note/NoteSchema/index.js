import gql from "graphql-tag";

const NOTES_QUERY = gql`
  query NotesQuery($id: ID!) {
    assignedTask(id: $id) {
      user {
        username
        role
      }
      assignedTo
      notes {
        id
        text
        createdAt
        user {
          id
          username
          role
        }
      }
    }
  }
`;

export default NOTES_QUERY;
