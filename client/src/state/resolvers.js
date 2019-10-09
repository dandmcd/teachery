import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    toggleST: Boolean!
    toggleSuccess: Boolean!
    togglePopup: Boolean!
  }
`;

const TOGGLE_SUCCESS_QUERY = gql`
  query {
    toggleSuccess @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleIsSuccess: (parent, variables, { cache }) => {
      const { toggleSuccess } = cache.readQuery({
        query: TOGGLE_SUCCESS_QUERY
      });

      const data = {
        data: { toggleSuccess: !toggleSuccess }
      };
      cache.writeQuery({ query: TOGGLE_SUCCESS_QUERY, data });
      return console.log(data);
    }
  }
};
