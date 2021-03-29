import gql from "graphql-tag";

export const CREATE_CARD = gql`
  mutation(
    $deckId: Int!
    $front: String!
    $back: String
    $pictureName: String
    $pictureUrl: String
  ) {
    createCard(
      deckId: $deckId
      front: $front
      back: $back
      pictureName: $pictureName
      pictureUrl: $pictureUrl
    ) {
      id
      front
      back
      createdAt
      pictureName
      pictureUrl
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
