import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";
import aws from "aws-sdk";

import { isAdmin, isAuthenticated } from "./authorization";

const s3Bucket = process.env.S3_BUCKET;

export default {
  Mutation: {
    signS3: combineResolvers(
      isAuthenticated,
      async (parent, { filename, filetype }) => {
        const s3 = new aws.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          signatureVersion: "v4",
          region: "us-east-2"
        });
        console.log(process.env.AWS_ACCESS_KEY_ID);
        const s3Params = {
          Bucket: s3Bucket,
          Key: filename,
          Expires: 60,
          ContentType: filetype,
          ACL: "public-read"
        };

        const signedRequest = await s3.getSignedUrl("putObject", s3Params);
        const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

        return {
          signedRequest,
          url
        };
      }
    )
  }
};
