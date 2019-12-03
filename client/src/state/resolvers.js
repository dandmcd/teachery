import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    toggleLanding: Int
    togglePopup: Boolean!
    toggleAddCard: Boolean!
    toggleAddTag: Boolean!
    toggleAssign: Boolean!
    toggleSuccess: Boolean!
    toggleDeleteSuccess: Boolean!
    toggleRoleChange: Boolean!
    assignmentId: Int
  }
  extend type Search {
    id: Int!
    tagName: String!
    showPopup: Boolean!
    noResult: Boolean!
    tags: [String]
  }
`;

const currentQuery = gql`
  query Curent {
    current @client
  }
`;

export const resolvers = {
  Mutation: {
    setCurrent: (parent, { current }, { cache }, info) => {
      cache.writeData({
        data: {
          current,
          __typename: "Current"
        }
      });

      return null;
    }
  },
  Query: {
    getCurrent: (parent, args, { cache }) => {
      const { current } = cache.readQuery({
        query: currentQuery
      });

      return current;
    }
  }
};
