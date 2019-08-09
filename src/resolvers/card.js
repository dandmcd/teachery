import Sequelize from "sequelize";
import { combineResolvers } from "graphql-resolvers";
import aws from "aws-sdk";

import { isAdmin, isAuthenticated } from "./authorization";

const s3Bucket = process.env.S3_BUCKET;

const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    cards: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor)
              }
            }
          }
        : {};

      const cards = await models.Card.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        ...cursorOptions
      });

      const hasNextPage = cards.length > limit;
      const edges = hasNextPage ? cards.slice(0, -1) : cards;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      };
    },
    card: async (parent, { id }, { models }) => {
      return await models.Card.findByPk(id);
    }
  },

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
    ),

    createCard: combineResolvers(
      isAdmin,
      async (
        parent,
        { deckId, front, back, pictureName, pictureUrl },
        { models }
      ) => {
        const card = await models.Card.create({
          deckId,
          front,
          back,
          pictureName,
          pictureUrl
        });
        return card;
      }
    ),

    deleteCard: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.Card.destroy({
          where: { id }
        });
      }
    )
  },

  Card: {
    deck: async (card, args, { loaders }) => {
      return await loaders.deck.load(card.deckId);
    }
  }
};
