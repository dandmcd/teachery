import gql from "graphql-tag";

const CARDS_QUERY = gql`
  query CardsQuery($id: ID!) {
    deck(id: $id) {
      id
      deckName
      user {
        id
      }
      cards {
        id
        front
        back
        pictureName
        pictureUrl
        createdAt
      }
    }
    toggleDeleteSuccess @client
  }
`;

export default CARDS_QUERY;
