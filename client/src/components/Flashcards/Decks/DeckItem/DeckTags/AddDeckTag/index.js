import React, { useState, useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "../../../../../Error";

const ADD_TAG_TO_DECK = gql`
  mutation($id: ID!, $tagName: String!) {
    addTagToDeck(id: $id, tagName: $tagName) {
      id
      tags {
        id
        tagName
      }
    }
  }
`;

const AddDeckTag = ({ deck }) => {
  const [state, setState] = useState({
    id: null,
    tagName: ""
  });

  const { id, tagName } = state;

  const onSubmit = async (e, addTagToDeck) => {
    e.preventDefault();

    try {
      setState({
        id: deck.id,
        tagName: ""
      });
      await addTagToDeck();
    } catch (error) {}
  };

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  useEffect(() => {
    if (deck && deck.id) {
      setState({ id: deck.id });
    }
  }, [deck]);

  return (
    <Mutation mutation={ADD_TAG_TO_DECK} variables={{ id, tagName }}>
      {(addTagToDeck, { data, loading, error }) => (
        <form onSubmit={e => onSubmit(e, addTagToDeck)}>
          <textarea
            name="tagName"
            value={tagName}
            onChange={onChange}
            type="text"
            placeholder="Tag Nameeee (REQUIRED)"
          />
          <button type="submit">Submit</button>

          {error && <ErrorMessage error={error} />}
        </form>
      )}
    </Mutation>
  );
};

export default AddDeckTag;
