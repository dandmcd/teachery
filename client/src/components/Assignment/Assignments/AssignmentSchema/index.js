import gql from "graphql-tag";

const GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS = gql`
  query getAssignments($cursor: String, $limit: Int!) {
    assignments(cursor: $cursor, limit: $limit)
      @connection(key: "AssignmentsConnection") {
      edges {
        id
        assignmentName
        note
        link
        documentUrl
        documentName
        createdAt
        user {
          id
          username
        }
        assignedTasks {
          status
          dueDate
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export default GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS;
