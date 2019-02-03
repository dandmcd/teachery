import gql from "graphql-tag";

const GET_PAGINATED_ASSIGNMENTS_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    assignments(cursor: $cursor, limit: $limit)
      @connection(key: "AssignmentsConnection") {
      edges {
        id
        assignment_name
        description
        url
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
