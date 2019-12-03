import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      id
      username
      email
      role
      assignments {
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
      }
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
