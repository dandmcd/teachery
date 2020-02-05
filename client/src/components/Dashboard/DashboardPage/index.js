import React, { Fragment } from "react";
import styled from "styled-components";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { Link } from "react-router-dom";

import withSession from "../../Session/withSession";
import Loading from "../../Loading";
import ErrorMessage from "../../Alerts/Error";
import DeckItemBase from "../../FlashCards/Decks/DeckItem";
import DeckList from "../../FlashCards/Decks/DeckList";
import Button from "../../../theme/Button";
import AssignedTaskList from "../../Assignment/Assignments/AssignedTaskList";
import GET_DASHBOARD from "../DashboardQuery";
import liked from "../../../assets/liked.png";
import gql from "graphql-tag";
import * as routes from "../../../routing/routes";
import * as Styled from "./style";

const DashboardPage = ({ session, me }) => {
  const client = useApolloClient();
  const { data: toggleData } = useQuery(gql`
    query Toggle {
      toggleBookmarks @client
      linkedToPage @client
    }
  `);
  const { toggleBookmarks, linkedToPage } = toggleData;

  console.log(session);

  const { data, error, loading } = useQuery(GET_DASHBOARD, {});
  if (loading && !data) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const date = moment().format("YYYYMMDD");
  const incomplete = data.dueAssignedTasks.edges.filter(
    item => item.status === "INCOMPLETE"
  );
  const overdue = incomplete.filter(item =>
    moment(date).isSameOrAfter(item.dueDate)
  );

  const toggleBookmarksLink = () => {
    client.writeData({
      data: { toggleBookmarks: true, linkedToPage: true }
    });
  };

  const toggleBookmarksLinkAll = () => {
    client.writeData({
      data: { toggleBookmarks: false, linkedToPage: true }
    });
  };

  return (
    <Fragment>
      <Styled.DashboardGrid>
        <Styled.AssignmentItemContainer>
          <Styled.Welcome>
            Welcome back <Link to={routes.ACCOUNT}>{session.me.username}</Link>!
          </Styled.Welcome>

          <Styled.Title>You have ...</Styled.Title>
          <Styled.AssignmentDiv>
            <Styled.Overdue>
              <Styled.OverdueButton>{overdue.length}</Styled.OverdueButton>{" "}
              {overdue.length === 0
                ? "assignments"
                : overdue.length === 1
                ? "assignment"
                : "assignments"}{" "}
              overdue
            </Styled.Overdue>
            <h4>
              <Styled.DueButton>{incomplete.length}</Styled.DueButton>{" "}
              {incomplete.length === 0
                ? "assignments"
                : incomplete.length === 1
                ? "assignment"
                : "assignments"}{" "}
              to complete{" "}
            </h4>
          </Styled.AssignmentDiv>
          <Link to={routes.ASSIGNMENTS}>
            <Styled.MoreAssignmentsButton>
              View All Assignments
            </Styled.MoreAssignmentsButton>
          </Link>
        </Styled.AssignmentItemContainer>
        <AssignedTaskList assignedTasks={data.assignedTasks.edges} me={me} />
      </Styled.DashboardGrid>
      <Styled.Hr />
      <Styled.DividerBack>
        <Styled.Headers>Recently Saved Flashcard Decks</Styled.Headers>
      </Styled.DividerBack>
      <Styled.DeckGrid>
        <Styled.GridCol>
          <DeckList decks={data.bookmarkedDecks.edges} me={me} />
        </Styled.GridCol>
        <Styled.GridButtonCol>
          <Link to={routes.FLASHCARDS} onClick={toggleBookmarksLink}>
            <Styled.MoreButton>View All Bookmarked Decks</Styled.MoreButton>
          </Link>
          <Link to={routes.FLASHCARDS} onClick={toggleBookmarksLink}>
            <Styled.LargeMoreButton>
              View All <Styled.LikedIcon src={liked} /> Bookmarked Decks
            </Styled.LargeMoreButton>
          </Link>
        </Styled.GridButtonCol>
      </Styled.DeckGrid>
      <Styled.Hr />
      <Styled.DividerBack>
        <Styled.Headers>Latest Decks Added</Styled.Headers>
      </Styled.DividerBack>
      <Styled.DeckGrid>
        <Styled.GridCol>
          <DeckList decks={data.decks.edges} me={me} />
        </Styled.GridCol>
        <Styled.GridButtonCol>
          <Link to={routes.FLASHCARDS} onClick={toggleBookmarksLinkAll}>
            <Styled.MoreButton>View All Decks</Styled.MoreButton>
          </Link>
          <Link to={routes.FLASHCARDS} onClick={toggleBookmarksLinkAll}>
            <Styled.LargeMoreButton>View All Decks</Styled.LargeMoreButton>
          </Link>
        </Styled.GridButtonCol>
      </Styled.DeckGrid>
    </Fragment>
  );
};

export default withSession(DashboardPage);
