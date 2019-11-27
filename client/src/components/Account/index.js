import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";

import withAuthorization from "../Session/withAuthorization";
import GoBack from "../Navigation/GoBack";
import { GET_ME } from "../Session/queries";
import Loading from "../Loading";
import ErrorMessage from "../Alerts/Error";
import { useQuery } from "@apollo/react-hooks";
import withSession from "../Session/withSession";
import DeckItemBase from "../FlashCards/Decks/DeckItem";
import AddDeckTag from "../FlashCards/Decks/DeckItem/DeckTags/AddDeckTag";
import DeckEdit from "../FlashCards/Decks/DeckEdit";
import Button from "../../theme/Button";

const BOOKMARKED_DECKS = gql`
  query getBookmarkedDecks($cursor: String, $limit: Int!) {
    bookmarkedDecks(cursor: $cursor, limit: $limit) {
      edges {
        id
        deckName
        description
        deckImageUrl
        deckImageName
        createdAt
        user {
          id
          username
        }
        tags {
          id
          tagName
        }
        cards {
          id
          front
          back
          pictureName
          pictureUrl
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const AccountPage = ({ limit, me }) => {
  const { data, error, loading, fetchMore } = useQuery(BOOKMARKED_DECKS, {
    variables: { limit }
  });
  if (loading && !data) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }
  console.log(data);
  const bookMarkedDecksToRender = data.bookmarkedDecks;
  console.log(bookMarkedDecksToRender);
  const { edges, pageInfo } = bookMarkedDecksToRender;
  return (
    <DeckContainer>
      <h3>Account Page</h3>
      <hr />
      <AddDeckTag />
      <DeckEdit />
      <DeckList bookMarkedDecksToRender={edges} me={me} />
      {pageInfo.hasNextPage && (
        <MoreDecksButton
          limit={limit}
          pageInfo={pageInfo}
          fetchMore={fetchMore}
        >
          More
        </MoreDecksButton>
      )}
    </DeckContainer>
  );
};

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
            bookmarkedDecks: {
              ...fetchMoreResult.bookmarkedDecks,
              edges: [
                ...previousResult.bookmarkedDecks.edges,
                ...fetchMoreResult.bookmarkedDecks.edges
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

const DeckButton = styled(Button)`
  margin: auto;
  display: block;
  width: 205px;
  border: 2px solid ${props => props.theme.primaryDark};
`;

const DeckList = ({ bookMarkedDecksToRender, me }) => {
  return (
    <DeckContainer>
      {bookMarkedDecksToRender.map(deck => (
        <DeckItem key={deck.id} deck={deck} me={me} />
      ))}
    </DeckContainer>
  );
};

const DeckItem = withSession(DeckItemBase);

const DeckContainer = styled.div`
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  row-gap: 20px;
  column-gap: 5px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default withAuthorization(session => session && session.me)(AccountPage);
