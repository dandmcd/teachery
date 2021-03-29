import gql from "graphql-tag";

export const UPDATE_DECK = gql`
  mutation(
    $id: ID!
    $deckName: String!
    $description: String!
    $deckImageName: String
    $deckImageUrl: String
  ) {
    updateDeck(
      id: $id
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
