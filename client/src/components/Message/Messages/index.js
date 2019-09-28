import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import MessageDelete from "../MessageDelete";
import Loading from "../../Loading";
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

const MessageContainer = styled.div`
  position: block;
  width: 300px;
  margin: auto;
  margin-bottom: 5px;
  overflow-y: scroll;
  border-radius: 20px;
  background: ${props => props.theme.neutralLight};
  text-align: center;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Messages = ({ limit }) => (
  <Query query={GET_PAGINATED_MESSAGES_WITH_USERS} variables={{ limit }}>
    {({ data, loading, error, fetchMore, subscribeToMore }) => {
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
    }}
  </Query>
);

const MessageButton = styled(Button)``;

const MoreMessagesButton = ({ limit, pageInfo, fetchMore, children }) => (
  <MessageButton
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
  </MessageButton>
);

class MessageList extends Component {
  subscribeToMoreMessage = () => {
    this.props.subscribeToMore({
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
  };

  componentDidMount() {
    this.subscribeToMoreMessage();
  }

  render() {
    const { messages } = this.props;

    return messages.map(message => (
      <MessageItem key={message.id} message={message} />
    ));
  }
}

const MessageItemBase = ({ message, session }) => (
  <Fragment>
    <h5>{message.user.username}</h5>
    <h6>{message.createdAt}</h6>
    <p>
      {message.text}
      {session && session.me && message.user.id === session.me.id && (
        <sup>
          <MessageDelete message={message} />
        </sup>
      )}
    </p>
  </Fragment>
);

const MessageItem = withSession(MessageItemBase);

export default Messages;
