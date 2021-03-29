import gql from "graphql-tag";

export const UPDATE_CARD = gql`
  mutation(
    $id: ID!
    $deckId: Int!
    $front: String!
    $back: String
    $pictureName: String
    $pictureUrl: String
  ) {
    updateCard(
      id: $id
      deckId: $deckId
      front: $front
      back: $back
      pictureName: $pictureName
      pictureUrl: $pictureUrl
    ) {
      id
      front
      back
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
