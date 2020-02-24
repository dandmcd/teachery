import React, { Fragment, useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import GET_PAGINATED_DECKS_WITH_USERS from "./DeckSchema";
import Loading from "../../Loading";
import ErrorMessage from "../../Alerts/Error";
import DeckList from "./DeckList";
import Button from "../../../theme/Button";
import NoData from "../../Alerts/NoData";

const Decks = ({ limit, me }) => {
  const client = useApolloClient();
  const { data: toggleData } = useQuery(gql`
    query Toggle {
      toggleBookmarks @client
      linkedToPage @client
    }
  `);
  const { toggleBookmarks, linkedToPage } = toggleData;

  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_PAGINATED_DECKS_WITH_USERS,
    {
      variables: { limit, showBookmarks: toggleBookmarks }
    }
  );

  useEffect(() => {
    if (toggleBookmarks && linkedToPage) {
      refetch();
      client.writeData({ data: { linkedToPage: !linkedToPage } });
    } else if (!toggleBookmarks && linkedToPage) {
      refetch();
      client.writeData({ data: { linkedToPage: !linkedToPage } });
    }
  }, [client, linkedToPage, refetch, toggleBookmarks]);

  useEffect(() => {
    if (linkedToPage) {
      window.scrollTo(0, 0);
      client.writeData({ data: { linkedToPage: !linkedToPage } });
    }
  }, []);

  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return (
      <NoData
        title="No Decks"
        message="There are no decks right now, or there was an error and we cannot connect right now.  Try refreshing your browser!"
      />
    );
  } else if (data.decks === null) {
    return (
      <NoData
        title="No Saved Decks"
        message="There are no saved decks right now."
      />
    );
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.decks;

  return (
    <Fragment>
      <DeckList decks={edges} me={me} />
      {pageInfo.hasNextPage && (
        <MoreDecksButton
          limit={limit}
          toggleBookmarks={toggleBookmarks}
          pageInfo={pageInfo}
          fetchMore={fetchMore}
        >
          More
        </MoreDecksButton>
      )}
    </Fragment>
  );
};

Decks.propTypes = {
  limit: PropTypes.number.isRequired,
  me: PropTypes.object
};

const DeckButton = styled(Button)`
  margin: auto;
  display: block;
  width: 205px;
  border: 2px solid ${props => props.theme.primaryDark};
`;

const MoreDecksButton = ({ limit, pageInfo, fetchMore, children }) => (
  <DeckButton
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
            decks: {
              ...fetchMoreResult.decks,
              edges: [
                ...previousResult.decks.edges,
                ...fetchMoreResult.decks.edges
              ]
            }
          };
        }
      })
    }
  >
    {children}
  </DeckButton>
);

MoreDecksButton.propTypes = {
  limit: PropTypes.number.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

export default Decks;
