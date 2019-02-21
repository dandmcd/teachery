import gql from "graphql-tag";

const GET_PAGINATED_CARDS_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    cards(cursor: $cursor, limit: $limit) @connection(key: "CardConnection") {
      edges {
        id
        front
        back
        createdAt
        deck {
          id
          deckName
          description
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export default GET_PAGINATED_CARDS_WITH_USERS;
