import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";

import GET_PAGINATED_DECKS_WITH_USERS from "./DeckSchema";
import Loading from "../../Alerts/Loading";
import ErrorMessage from "../../Alerts/Error";
import DeckList from "./DeckList";
import Button from "../../../theme/Button";
import NoData from "../../Alerts/NoData";
import { useAtom } from "jotai";
import { bookmarkAtom } from "../../../state/store";

const Decks = ({ limit, me }) => {
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const { toggleBookmarks, linkedToPage } = bookmark;

  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_PAGINATED_DECKS_WITH_USERS,
    {
      variables: { limit, showBookmarks: toggleBookmarks },
    }
  );

  useEffect(() => {
    if (toggleBookmarks && linkedToPage) {
      refetch();
      setBookmark(
        (a) =>
          (a = {
            ...a,
            linkedToPage: !linkedToPage,
          })
      );
    } else if (!toggleBookmarks && linkedToPage) {
      refetch();
      setBookmark(
        (a) =>
          (a = {
            ...a,
            linkedToPage: !linkedToPage,
          })
      );
    }
  }, [setBookmark, linkedToPage, refetch, toggleBookmarks]);

  useEffect(() => {
    if (linkedToPage) {
      window.scrollTo(0, 0);
      setBookmark(
        (a) =>
          (a = {
            ...a,
            linkedToPage: !linkedToPage,
          })
      );
    }
  });

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
    <>
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
    </>
  );
};

Decks.propTypes = {
  limit: PropTypes.number.isRequired,
  me: PropTypes.object,
};

const DeckButton = styled(Button)`
  margin: auto;
  display: block;
  width: 205px;
  border: 2px solid ${(props) => props.theme.primaryDark};
`;

const MoreDecksButton = ({ limit, pageInfo, fetchMore, children }) => {
  const fetchEvent = () => {
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
        limit,
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
              ...fetchMoreResult.decks.edges,
            ],
          },
        };
      },
    });
  };
  return (
    <DeckButton type="button" onMouseOver={fetchEvent} onClick={fetchEvent}>
      {children}
    </DeckButton>
  );
};

MoreDecksButton.propTypes = {
  limit: PropTypes.number.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Decks;
