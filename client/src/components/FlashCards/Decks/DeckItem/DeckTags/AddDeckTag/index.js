import React, { Fragment, useState, useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ErrorMessage from "../../../../../Alerts/Error";
import * as Styled from "../../../../../../theme/Popup";
import Button from "../../../../../../theme/Button";
import SuccessMessage from "../../../../../Alerts/Success";
import Loading from "../../../../../Loading";

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
  const client = useApolloClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [state, setState] = useState({
    id: null,
    tagName: ""
  });

  const [addTagToDeck, { loading, error }] = useMutation(ADD_TAG_TO_DECK, {
    onError: err => {
      setIsSuccess(false);
    },
    onCompleted: data => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  });

  const { id, tagName } = state;

  const onSubmit = async (e, addTagToDeck) => {
    e.preventDefault();

    try {
      setState({
        id: deck.id,
        tagName: ""
      });
      await addTagToDeck({
        variables: {
          id: id,
          tagName: tagName
        }
      });
    } catch (error) {}
  };

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  useEffect(() => {
    if (deck && deck.id) {
      setState({ id: deck.id, tagName: "" });
    }
  }, [deck]);

  const closePopup = () => {
    client.writeData({ data: { isAddTagActive: false } });
  };

  return (
    <Fragment>
      <Styled.PopupTitle>Create a tag for this deck...</Styled.PopupTitle>
      <Styled.PopupBody>
        <form onSubmit={e => onSubmit(e, addTagToDeck)}>
          <Styled.Input
            name="tagName"
            value={tagName}
            onChange={onChange}
            type="text"
            placeholder="Enter a Tag Name"
          />
          <Button type="submit">Submit</Button>
          {loading && <Loading />}
          {isSuccess && <SuccessMessage message="Tag Created!" />}
          {error && <ErrorMessage error={error} />}
        </form>
      </Styled.PopupBody>
      <Styled.PopupFooterButton onClick={closePopup}>
        Close
      </Styled.PopupFooterButton>
    </Fragment>
  );
};

export default AddDeckTag;
