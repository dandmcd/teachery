import gql from "graphql-tag";

export const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

export const GET_PAGINATED_MESSAGES_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    messages(cursor: $cursor, limit: $limit)
      @connection(key: "MessagesConnection") {
      edges {
        id
        text
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
