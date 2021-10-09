import React from "react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import PropTypes from "prop-types";

import withSession from "../../Session/withSession";
import Loading from "../../Alerts/Loading";
import ErrorMessage from "../../Alerts/Error";
import DeckList from "../../FlashCards/Decks/DeckList";
import AssignedTaskList from "../../AssignedTask/AssignedTasks/AssignedTaskList";
import GET_DASHBOARD from "../DashboardSchema";
import liked from "../../../assets/liked.png";
import * as routes from "../../../routing/routes";
import * as Styled from "./style";
import { bookmarkAtom } from "../../../state/store";

const DashboardPage = ({ session, me }) => {
  const [, setBookmark] = useAtom(bookmarkAtom);

  const { data, error, loading } = useQuery(GET_DASHBOARD, {});
  if (loading && !data) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  //Check assignments due date status
  const date = moment().format("YYYYMMDD");
  let incomplete;
  let overdue;

  if (data.dueAssignedTasks === null) {
    incomplete = 0;
    overdue = 0;
  } else {
    incomplete = data.dueAssignedTasks.edges.filter(
      (item) => item.status === "INCOMPLETE"
    );
    overdue = incomplete.filter((item) =>
      moment(date).isSameOrAfter(item.dueDate)
    );
    incomplete = incomplete.length;
    overdue = overdue.length;
  }

  const toggleBookmarksLink = () => {
    setBookmark(
      (a) =>
        (a = {
          ...a,
          toggleBookmarks: true,
          linkedToPage: true,
        })
    );
  };

  const toggleBookmarksLinkAll = () => {
    setBookmark(
      (a) =>
        (a = {
          ...a,
          toggleBookmarks: false,
          linkedToPage: true,
        })
    );
  };

  return (
    <>
      <Styled.DashboardGrid>
        <Styled.AssignmentItemContainer>
          <Styled.Welcome>
            Welcome back <Link to={routes.ACCOUNT}>{session.me.username}</Link>!
          </Styled.Welcome>

          <Styled.Title>You have ...</Styled.Title>
          <Styled.AssignmentDiv>
            <Styled.Overdue>
              <Styled.OverdueButton>{overdue}</Styled.OverdueButton>{" "}
              {overdue.length === 0
                ? "assignments"
                : overdue.length === 1
                ? "assignment"
                : "assignments"}{" "}
              overdue
            </Styled.Overdue>
            <h4>
              <Styled.DueButton>{incomplete}</Styled.DueButton>{" "}
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
        {data.assignedTasks !== null ? (
          <AssignedTaskList assignedTasks={data.assignedTasks.edges} me={me} />
        ) : (
          <EmptyAssignedContainer />
        )}{" "}
      </Styled.DashboardGrid>
      {data.bookmarkedDecks !== null && (
        <>
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
        </>
      )}

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
      {data.bookmarkedDecks === null && (
        <>
          <Styled.DividerBack>
            <Styled.Headers>Recently Saved Flashcard Decks</Styled.Headers>
          </Styled.DividerBack>

          <Styled.EmptyText>
            You don't currenly have any saved decks, but if you did, they would
            appear right here!
          </Styled.EmptyText>
        </>
      )}
    </>
  );
};

const EmptyAssignedContainer = () => {
  return (
    <Styled.EmptyAssignmentItemContainer>
      <Styled.EmptyCardGrid>
        <Styled.EmptyNote>
          "Education is the passport to the future, for tomorrow belongs to
          those who prepare for it today.
        </Styled.EmptyNote>
        <Styled.EmptyTitle>
          <Styled.EmptyTitleSpan>~</Styled.EmptyTitleSpan>
          Malcolm X
        </Styled.EmptyTitle>
      </Styled.EmptyCardGrid>
    </Styled.EmptyAssignmentItemContainer>
  );
};

DashboardPage.propTypes = {
  session: PropTypes.object,
  me: PropTypes.object,
};

export default withSession(DashboardPage);
