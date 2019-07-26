import gql from "graphql-tag";

const GET_PAGINATED_ASSIGNMENTS_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    assignedTasks(cursor: $cursor, limit: $limit)
      @connection(key: "AssignedTaskConnection") {
      edges {
        id
        status
        dueDate
        createdAt
        assignedTo
        assignment {
          assignmentName
          note
          link
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export default GET_PAGINATED_ASSIGNMENTS_WITH_USERS;
