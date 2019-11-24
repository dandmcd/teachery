import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { cloneDeep } from "apollo-utilities";
import GET_PAGINATED_DECKS_WITH_USERS from "../../../DeckSchema";

const REMOVE_TAG = gql`
  mutation($id: ID!, $tagId: ID!) {
    removeTagFromDeck(id: $id, tagId: $tagId)
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
  const [removeTagFromDeck] = useMutation(REMOVE_TAG, {
    update(cache, { data: { removeTagFromDeck } }) {
      const localData = cloneDeep(
        cache.readFragment({
          id: deckId,
          fragment: gql`
            fragment deck on Deck {
              id
              tags {
                id
                tagName
              }
            }
          `
        })
      );
      console.log(localData);
      localData.tags = localData.tags.filter(item => item.id !== tag.id);
      console.log(localData);
      cache.writeFragment({
        id: deckId,
        fragment: gql`
          fragment deck on Deck {
            id
            tags {
              id
              tagName
            }
          }
        `,
        data: { ...localData }
      });
    }
  });

  const onSubmit = (e, removeTagFromDeck) => {
    e.preventDefault();
    removeTagFromDeck({
      variables: { id: deckId, tagId: tag.id }
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
          onSubmit(e, removeTagFromDeck);
      }}
    />
  );
};

TagDelete.propTypes = {
  tag: PropTypes.object.isRequired,
  deckId: PropTypes.string
};

export default TagDelete;
