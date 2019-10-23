import React, { useState, useEffect, useRef } from "react";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

import useOuterClickNotifier from "../../../../../Alerts";
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

const INITIAL_STATE = {
  id: null,
  tagName: ""
};

const AddDeckTag = ({ deck }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleAddTag @client
    }
  `);
  const { toggleSuccess, toggleAddTag } = data;

  const [{ tagName }, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (deck && deck.id) {
      setState({ id: deck.id, tagName: "" });
    }
  }, [deck]);

  const [addTagToDeck, { loading, error }] = useMutation(ADD_TAG_TO_DECK, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    }
  });

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const isInvalid = tagName === "";

  const onSubmit = async (e, addTagToDeck) => {
    e.preventDefault();

    try {
      await addTagToDeck({
        variables: {
          id: deck.id,
          tagName: tagName
        }
      }).then(async ({ data }) => {
        setState({
          ...INITIAL_STATE
        });
      });
    } catch (error) {}
  };

  const togglePopupModal = () => {
    client.writeData({
      data: { toggleAddTag: !toggleAddTag }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Container>
      <AddTagButton type="button" onClick={togglePopupModal}>
        Add Tag
      </AddTagButton>
      {toggleAddTag ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
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
                <Button disabled={isInvalid || loading} type="submit">
                  Submit
                </Button>
                {loading && <Loading />}
                {toggleSuccess && <SuccessMessage message="Tag Created!" />}
                {error && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
            <Styled.PopupFooterButton onClick={togglePopupModal}>
              Close
            </Styled.PopupFooterButton>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Container>
  );
};

AddDeckTag.propTypes = {
  deck: PropTypes.object.isRequired
};

const Container = styled.div``;

const AddTagButton = styled(Button)`
  border: 2px solid #138181;
  :hover {
    background: #179c9c;
  }
`;

export default AddDeckTag;
