import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import GET_PAGINATED_DECKS_WITH_USERS from "../../Decks/DeckSchema";

const DELETE_TAG = gql`
  mutation($id: ID!) {
    deleteTag(id: $id)
  }
`;

const TagDelete = ({ tag }) => (
  <Mutation
    mutation={DELETE_TAG}
    variables={{ id: tag.id }}
    update={cache => {
      const data = cache.readQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS
      });

      cache.writeQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS,
        data: {
          ...data,
          tags: {
            ...data.tags,
            edges: data.tags.edges.filter(node => node.id !== tag.id),
            pageInfo: data.tags.pageInfo
          }
        }
      });
    }}
  >
    {(deleteTag, { data, loading, error }) => (
      <button type="button" onClick={deleteTag}>
        Delete
      </button>
    )}
  </Mutation>
);

export default TagDelete;
