import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import ErrorMessage from "../../Alerts/Error";
import removeitem from "../../../assets/remove-item.png";

const GET_ALL_MESSAGES_WITH_USERS = gql`
  query {
    messages(order: "DESC") @connection(key: "MessagesConnection") {
      edges {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation($id: ID!) {
    deleteMessage(id: $id)
  }
`;

const MessageDelete = ({ message }) => {
  const [deleteMessage, { error }] = useMutation(DELETE_MESSAGE, {
    update(cache, { data: { deleteMessage } }) {
      const data = cache.readQuery({ query: GET_ALL_MESSAGES_WITH_USERS });
      cache.writeQuery({
        query: GET_ALL_MESSAGES_WITH_USERS,
        data: {
          ...data,
          messages: {
            ...data.messages,
            edges: data.messages.edges.filter((node) => node.id !== message.id),
            pageInfo: data.messages.pageInfo,
          },
        },
      });
    },
  });

  const onSubmit = (e, deleteCard) => {
    e.preventDefault();
    deleteCard({
      variables: { id: message.id },
    });
  };
  return (
    <>
      <input
        type="image"
        src={removeitem}
        width="8"
        height="8"
        alt="Delete Message"
        onClick={(e) => {
          if (window.confirm("Are you sure you wish to delete this message?"))
            onSubmit(e, deleteMessage);
        }}
      />
      {error && <ErrorMessage error={error} />}
    </>
  );
};

MessageDelete.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageDelete;
