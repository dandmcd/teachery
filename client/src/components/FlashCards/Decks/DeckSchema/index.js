import gql from "graphql-tag";

const GET_PAGINATED_DECKS_WITH_USERS = gql`
  query getDecks($cursor: String, $limit: Int!, $showBookmarks: Boolean) {
    decks(cursor: $cursor, limit: $limit, showBookmarks: $showBookmarks)
      @connection(key: "DeckConnection") {
      edges {
        id
        deckName
        description
        deckImageUrl
        deckImageName
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
          pictureName
          pictureUrl
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
