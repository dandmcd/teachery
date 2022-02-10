import gql from "graphql-tag";

const GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS = gql`
  query getAssignedTasksTeacher($cursor: String, $limit: Int!) {
    assignedTasksTeacher(cursor: $cursor, limit: $limit)
      @connection(key: "AssignedTaskTeacherConnection") {
      edges {
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
          documentName
          documentUrl
          createdAt
          user {
            id
            username
          }
        }
        notes {
          id
          text
          noteCreatedAt: createdAt
          user {
            id
            username
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS;
