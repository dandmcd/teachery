import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";

import GET_PAGINATED_DECKS_WITH_USERS from "./DeckSchema";
import Loading from "../../Loading";
import ErrorMessage from "../../Alerts/Error";
import withSession from "../../Session/withSession";
import DeckItemBase from "./DeckItem";
import Button from "../../../theme/Button";

const Decks = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_DECKS_WITH_USERS,
    { variables: { limit } }
  );
  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return <div>There are no decks yet ...</div>;
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

const DeckContainer = styled.div`
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  row-gap: 20px;
  column-gap: 5px;
  align-items: center;
  margin-bottom: 20px;
`;

const DeckList = ({ decks, me }) => {
  return (
    <DeckContainer>
      {decks.map(deck => (
        <DeckItem key={deck.id} deck={deck} me={me} />
      ))}
    </DeckContainer>
  );
};

DeckList.propTypes = {
  decks: PropTypes.array.isRequired,
  me: PropTypes.object
};

const DeckItem = withSession(DeckItemBase);

export default Decks;
