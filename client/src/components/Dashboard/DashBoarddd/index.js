import React from "react";
import styled from "styled-components";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import AssignedTasks from "../../Assignment/Assignments";
import { Link } from "react-router-dom";
import withSession from "../../Session/withSession";
import gql from "graphql-tag";
import withAuthorization from "../../Session/withAuthorization";
import Decks from "../../FlashCards/Decks";
import Loading from "../../Loading";
import ErrorMessage from "../../Alerts/Error";
import DeckItemBase from "../../FlashCards/Decks/DeckItem";
import DeckList from "../../FlashCards/Decks/DeckList";

const GET_DASHBOARD = gql`
  query {
    assignedTasks(limit: 1) {
      edges {
        id
        assignmentId
        status
        dueDate
        createdAt
        assignedTo
        assignedToName
        updatedDocumentName
        updatedDocumentUrl
        user {
          id
          username
        }
      }
    }
    decks(limit: 2, showBookmarks: true) {
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
    }
  }
`;

const DashboardPage = ({ session, me }) => {
  const client = useApolloClient();

  console.log(session);

  const { data, error, loading } = useQuery(GET_DASHBOARD, {
    variables: { limit: 1, showBookmarks: true }
  });
  if (loading && !data) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  console.log(data);
  console.log(data.decks);
  const deck = data.decks.edges[0];

  return (
    <div>
      <DashboardFlex>
        <div>
          <p>You have</p>
          <p>0 assignments overdue</p>
          <p>{session.me.assignments.length} assignment due </p>
          <p></p>
        </div>
        <div>
          <AssignedTasks limit={1} />
        </div>
      </DashboardFlex>
      <hr />
      <div>
        <h3>Saved Flashcard Decks</h3>
        <DashboardFlex>
          <DeckList decks={data.decks.edges} me={me} />
        </DashboardFlex>
        <hr />
        <h3>Newest Decks</h3>
        <DashboardFlex>
          <div>Deck 1</div>
          <div>Deck 2</div>
          <div>See More</div>
        </DashboardFlex>
      </div>
    </div>
  );
};

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

const DashboardFlex = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DeckItem = withSession(DeckItemBase);

export default withSession(DashboardPage);
