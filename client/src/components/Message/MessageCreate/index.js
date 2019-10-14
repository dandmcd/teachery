import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import * as Styled from "../../../theme/Popup";
import Button from "../../../theme/Button";
import ErrorMessage from "../../Alerts/Error";
import Loading from "../../Loading";

const CREATE_MESSAGE = gql`
  mutation($text: String!) {
    createMessage(text: $text) {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
`;

const INITIAL_STATE = {
  text: ""
};

const MessageCreate = () => {
  const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE);
  const [{ text }, setText] = useState(INITIAL_STATE);

  const onChange = e => {
    const { name, value } = e.target;
    setText(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, createMessage) => {
    e.preventDefault();

    try {
      await createMessage({ variables: { text: text } }).then(
        async ({ data }) => {
          setText(INITIAL_STATE);
        }
      );
    } catch (error) {}
  };

  return (
    <form onSubmit={e => onSubmit(e, createMessage)}>
      <Styled.InputTextArea
        name="text"
        value={text}
        onChange={onChange}
        type="text"
        placeholder="Your message ..."
      />
      <SendButton type="submit">Send</SendButton>

      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
    </form>
  );
};

const SendButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export default MessageCreate;
