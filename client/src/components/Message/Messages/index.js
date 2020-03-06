import React, { Fragment, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

import MessageDelete from "../MessageDelete";
import Loading from "../../Alerts/Loading";
import withSession from "../../Session/withSession";
import Button from "../../../theme/Button";
import ErrorMessage from "../../Alerts/Error";

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

const GET_PAGINATED_MESSAGES_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    messages(cursor: $cursor, limit: $limit)
      @connection(key: "MessagesConnection") {
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
        endCursor
      }
    }
  }
`;

const Messages = ({ limit }) => {
  const {
    data,
    loading,
    error,
    fetchMore,
    subscribeToMore
  } = useQuery(GET_PAGINATED_MESSAGES_WITH_USERS, { variables: { limit } });
  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return <div>There are no messages yet ...</div>;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }
  const { edges, pageInfo } = data.messages;

  return (
    <MessageContainer>
      <MessageList messages={edges} subscribeToMore={subscribeToMore} />

      {pageInfo.hasNextPage && (
        <MoreMessagesButton
          limit={limit}
          pageInfo={pageInfo}
          fetchMore={fetchMore}
        >
          More
        </MoreMessagesButton>
      )}
    </MessageContainer>
  );
};

Messages.propTypes = {
  limit: PropTypes.number.isRequired
};

const MessageContainer = styled.div`
  position: block;
  width: 300px;
  height: 260px;
  margin: auto;
  margin-bottom: 5px;
  overflow-y: scroll;
  border-radius: 20px;
  background: ${props => props.theme.neutralLight};
  text-align: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MoreMessagesButton = ({ limit, pageInfo, fetchMore, children }) => (
  <MoreButton
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          limit
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            messages: {
              ...fetchMoreResult.messages,
              edges: [
                ...previousResult.messages.edges,
                ...fetchMoreResult.messages.edges
              ]
            }
          };
        }
      })
    }
  >
    {children}
  </MoreButton>
);

const MoreButton = styled(Button)`
  border-color: ${props => props.theme.primaryDark};
`;

MoreMessagesButton.propTypes = {
  limit: PropTypes.number.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

const MessageList = props => {
  const subscribeToMoreMessage = useCallback(() => {
    props.subscribeToMore({
      document: MESSAGE_CREATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult;
        }

        const { messageCreated } = subscriptionData.data;

        return {
          ...previousResult,
          messages: {
            ...previousResult.messages,
            edges: [messageCreated.message, ...previousResult.messages.edges]
          }
        };
      }
    });
  }, [props]);

  useEffect(() => {
    subscribeToMoreMessage();
  }, [subscribeToMoreMessage]);

  const { messages } = props;

  return messages.map(message => (
    <MessageItem key={message.id} message={message} />
  ));
};

MessageList.propTypes = {
  props: PropTypes.object
};

const MessageItemBase = ({ message, session }) => (
  <Fragment>
    <Username>{message.user.username}</Username>
    <DateCreated>{message.createdAt}</DateCreated>
    <Text>
      {message.text}
      {session && session.me && message.user.id === session.me.id && (
        <sup>
          <MessageDelete message={message} />
        </sup>
      )}
    </Text>
  </Fragment>
);

MessageItemBase.propTypes = {
  message: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

const Username = styled.h5`
  margin: 0.2em 0 0.2em 0;
`;

const DateCreated = styled.h6`
  margin: 0.2em 0 0.4em 0;
  color: ${props => props.theme.textLight};
`;

const Text = styled.p`
  margin: 0.2em 0 0.7em 0;
`;

const MessageItem = withSession(MessageItemBase);

export default Messages;
