import React, { Fragment, useState, useEffect } from "react";
import { Mutation } from "react-apollo";
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

const AddDeckTag = ({ deck, setIsOn }) => {
  const [isSuccess, setIsSuccess] = useState(false);
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
      setState({ id: deck.id, tagName: "" });
    }
  }, [deck]);

  const togglePopup = () => {
    setIsOn(false);
  };

  return (
    <Fragment>
      <Styled.PopupTitle>Create a tag for this deck...</Styled.PopupTitle>
      <Styled.PopupBody>
        <Mutation
          mutation={ADD_TAG_TO_DECK}
          variables={{ id, tagName }}
          onError={data => setIsSuccess(false)}
          onCompleted={data => {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 5000);
          }}
        >
          {(addTagToDeck, { data, loading, error }) => (
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
          )}
        </Mutation>
      </Styled.PopupBody>
      <Styled.PopupFooterButton onClick={togglePopup}>
        Close
      </Styled.PopupFooterButton>
    </Fragment>
  );
};

export default AddDeckTag;
