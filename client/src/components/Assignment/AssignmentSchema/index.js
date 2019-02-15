import gql from "graphql-tag";

const GET_PAGINATED_ASSIGNMENTS_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    assignments(cursor: $cursor, limit: $limit)
      @connection(key: "AssignmentsConnection") {
      edges {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export default GET_PAGINATED_ASSIGNMENTS_WITH_USERS;
