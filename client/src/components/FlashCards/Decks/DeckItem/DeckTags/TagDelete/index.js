import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import GET_PAGINATED_DECKS_WITH_USERS from "../../../DeckSchema";

const DELETE_TAG = gql`
  mutation($id: ID!) {
    deleteTag(id: $id)
  }
`;

const TagDelete = ({ tag }) => (
  <Mutation
    mutation={DELETE_TAG}
    variables={{ id: tag.id }}
    refetchQueries={[
      { query: GET_PAGINATED_DECKS_WITH_USERS, variables: { limit: 3 } }
    ]}
  >
    {(deleteTag, { data, loading, error }) => (
      <input
        type="image"
        src={require("./remove-item.png")}
        width="8"
        height="8"
        alt="Delete Tag"
        onClick={deleteTag}
      />
    )}
  </Mutation>
);

export default TagDelete;
