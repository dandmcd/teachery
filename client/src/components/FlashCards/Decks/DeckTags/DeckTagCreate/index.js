import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ErrorMessage from "../../../../Alerts/Error";
import * as Styled from "../../../../../theme/Popup";
import SuccessMessage from "../../../../Alerts/Success";
import Loading from "../../../../Alerts/Loading";
import { useAtom } from "jotai";
import { modalAtom, successAlertAtom } from "../../../../../state/store";
import Modal from "../../../../Modal";

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
  tagName: "",
};

const AddDeckTag = () => {
  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, modalId, target } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);

  const [{ id, tagName }, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (toggleOn && modalId) {
      setState({ id: modalId, tagName: "" });
    }
  }, [toggleOn, modalId]);

  const [addTagToDeck, { loading, error }] = useMutation(ADD_TAG_TO_DECK, {
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
  });

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert((a) => (a = false));
      }, 5000);
    }
  }, [successAlert, setSuccessAlert]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isInvalid = tagName === "";

  const onSubmit = async (e, addTagToDeck) => {
    e.preventDefault();

    try {
      await addTagToDeck({
        variables: {
          id: id,
          tagName: tagName,
        },
      }).then(async ({ data }) => {
        setState({
          id: modalId,
          tagName: "",
        });
      });
    } catch (error) {}
  };

  const toggleOffModal = () => {
    setModal((m) => (m = { ...m, toggleOn: false, editImg: false }));
  };

  return (
    <>
      {toggleOn && target === "decktag" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Create a tag for this deck...</Styled.PopupTitle>
            <Styled.PopupFooterButton title="Close" onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <form onSubmit={(e) => onSubmit(e, addTagToDeck)}>
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
              {successAlert && <SuccessMessage message="Tag Created!" />}
              {error && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

export default AddDeckTag;
