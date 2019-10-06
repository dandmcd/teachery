import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const DELETE_TAG = gql`
  mutation($id: ID!) {
    deleteTag(id: $id)
  }
`;

const DECK_TAG_QUERY = gql`
  query getDeckTags($id: ID!) {
    deck(id: $id) {
      id
      tags {
        id
        tagName
      }
    }
  }
`;

const TagDelete = ({ tag, deckId }) => {
  const [deleteTag] = useMutation(DELETE_TAG);

  const onSubmit = (e, deleteTag) => {
    e.preventDefault();
    deleteTag({
      variables: { id: tag.id },
      refetchQueries: [
        {
          query: DECK_TAG_QUERY,
          variables: {
            id: deckId
          }
        }
      ]
    });
  };

  return (
    <input
      type="image"
      src={require("../../../../../../assets/remove-item.png")}
      width="5"
      height="5"
      alt="Delete Tag"
      onClick={e => {
        if (window.confirm("Are you sure you wish to delete this tag?"))
          onSubmit(e, deleteTag);
      }}
    />
  );
};

export default TagDelete;
