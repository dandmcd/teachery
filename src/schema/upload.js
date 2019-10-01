import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    """
    AWS S3 Payload
    """
    signS3(filename: String!, filetype: String!): S3Payload!
  }

  type S3Payload {
    signedRequest: String!
    url: String!
  }
`;
