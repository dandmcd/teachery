import gql from "graphql-tag";

export const CREATE_DECK = gql`
  mutation(
    $deckName: String!
    $description: String!
    $deckImageName: String
    $deckImageUrl: String
  ) {
    createDeck(
      deckName: $deckName
      description: $description
      deckImageName: $deckImageName
      deckImageUrl: $deckImageUrl
    ) {
      id
      deckName
      description
      deckImageName
      deckImageUrl
      createdAt
      user {
        id
        username
      }
      cards {
        id
        front
        back
      }
      tags {
        id
        tagName
      }
    }
  }
`;

export const S3SIGNMUTATION = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
