import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import * as Styled from "../../../theme/Popup";
import Button from "../../../theme/Button";

import ErrorMessage from "../../Alerts/Error";

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

const SendButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const MessageCreate = () => {
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = async (e, createMessage) => {
    e.preventDefault();

    try {
      await createMessage();
      setText("");
    } catch (error) {}
  };

  return (
    <Mutation mutation={CREATE_MESSAGE} variables={{ text }}>
      {(createMessage, { data, loading, error }) => (
        <form onSubmit={e => onSubmit(e, createMessage)}>
          <Styled.InputTextArea
            name="text"
            value={text}
            onChange={onChange}
            type="text"
            placeholder="Your message ..."
          />
          <SendButton type="submit">Send</SendButton>

          {error && <ErrorMessage error={error} />}
        </form>
      )}
    </Mutation>
  );
};

export default MessageCreate;
