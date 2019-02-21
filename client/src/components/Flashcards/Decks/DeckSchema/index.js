import gql from "graphql-tag";

const GET_PAGINATED_DECKS_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    decks(cursor: $cursor, limit: $limit) @connection(key: "DeckConnection") {
      edges {
        id
        deckName
        description
        createdAt
        user {
          id
          username
        }
        tags {
          id
          tagName
        }
        cards {
          id
          front
          back
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export default GET_PAGINATED_DECKS_WITH_USERS;
