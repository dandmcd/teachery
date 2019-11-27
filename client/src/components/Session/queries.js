import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      id
      username
      email
      role
      bookmarkedDecks {
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
    }
  }
`;
