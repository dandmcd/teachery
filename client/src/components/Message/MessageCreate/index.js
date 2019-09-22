import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
          <textarea
            name="text"
            value={text}
            onChange={onChange}
            type="text"
            placeholder="Your message ..."
          />
          <button type="submit">Send</button>

          {error && <ErrorMessage error={error} />}
        </form>
      )}
    </Mutation>
  );
};

export default MessageCreate;
