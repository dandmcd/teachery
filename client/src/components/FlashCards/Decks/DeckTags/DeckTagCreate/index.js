import React, { useState, useEffect, useRef, Fragment } from "react";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import useOuterClickNotifier from "../../../../Alerts/OuterClickNotifier";
import ErrorMessage from "../../../../Alerts/Error";
import * as Styled from "../../../../../theme/Popup";
import SuccessMessage from "../../../../Alerts/Success";
import Loading from "../../../../Alerts/Loading";

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

const AddDeckTag = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleAddTag @client
      current @client
    }
  `);
  const { toggleSuccess, toggleAddTag, current } = data;

  const [{ id, tagName }, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (toggleAddTag && current) {
      setState({ id: current, tagName: "" });
    }
  }, [toggleAddTag, current]);

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
          id: id,
          tagName: tagName
        }
      }).then(async ({ data }) => {
        setState({
          id: current,
          tagName: ""
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
    <Fragment>
      {toggleAddTag ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupHeader>
              <Styled.PopupTitle>
                Create a tag for this deck...
              </Styled.PopupTitle>
              <Styled.PopupFooterButton
                title="Close"
                onClick={togglePopupModal}
              >
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, addTagToDeck)}>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>Tag Name</Styled.LabelName>
                  </Styled.Span>
                  <Styled.Input
                    name="tagName"
                    value={tagName}
                    onChange={onChange}
                    type="text"
                  />
                </Styled.Label>
                <Styled.SubmitButton
                  disabled={isInvalid || loading}
                  type="submit"
                >
                  Submit
                </Styled.SubmitButton>
                {loading && <Loading />}
                {toggleSuccess && <SuccessMessage message="Tag Created!" />}
                {error && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Fragment>
  );
};

export default AddDeckTag;
