import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAtom } from "jotai";

import * as Styled from "../../../theme/Popup";
import Loading from "../../Alerts/Loading";
import ErrorMessage from "../../Alerts/Error";
import {
  isSubmittingAtom,
  modalAtom,
  successAlertAtom,
} from "../../../state/store";
import SuccessMessage from "../../Alerts/Success";
import NOTES_QUERY from "../NoteSchema";

const CREATE_NOTE = gql`
  mutation ($assignedTaskId: Int!, $text: String!) {
    createNote(assignedTaskId: $assignedTaskId, text: $text) {
      id
      text
      createdAt
      user {
        id
        username
        role
      }
    }
  }
`;

const INITIAL_STATE = {
  text: "",
};

const NoteCreate = () => {
  const [modal] = useAtom(modalAtom);
  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert((a) => (a = false));
      }, 5000);
    }
  }, [successAlert, setSuccessAlert]);

  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [
      { query: NOTES_QUERY, variables: { id: modal.modalId } }, // DocumentNode object parsed with gql // Query name
    ],
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
  });
  const [{ text }, setText] = useState(INITIAL_STATE);

  const onChange = (e) => {
    const { name, value } = e.target;
    setText((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, createNote) => {
    e.preventDefault();

    try {
      await createNote({
        variables: { assignedTaskId: Number(modal.modalId), text: text },
      }).then(async ({ data }) => {
        setText(INITIAL_STATE);
        setIsSubmitting((a) => (a = false));
      });
    } catch (error) {
      setIsSubmitting((a) => (a = false));
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e, createNote)}>
      <Styled.InputTextArea
        name="text"
        value={text}
        onChange={onChange}
        type="text"
        placeholder="Leave a note for your teacher ..."
      />
      {!isSubmitting ? (
        <Styled.SubmitButton type="submit">Send</Styled.SubmitButton>
      ) : (
        <Loading />
      )}
      {loading && <Loading />}

      {successAlert && <SuccessMessage message="Note Created!" />}
      {error && <ErrorMessage error={error} />}
    </form>
  );
};

export default NoteCreate;
