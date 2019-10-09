import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Moment from "react-moment";
import styled from "styled-components";

import withSession from "../../Session/withSession";
import GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS from "../AssignmentAdmin/AssignmentAdminSchema";
import AssignmentDelete from "../AssignmentDelete";
import Loading from "../../Loading";
import * as Styled from "./style";
import ErrorMessage from "../../Alerts/Error";
import Button from "../../../theme/Button";

const Assignments = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS,
    { variables: { limit } }
  );
  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return <div>There are no assignments yet ...</div>;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.assignments;

  return (
    <Styled.AssignmentContainer>
      <AssignmentList assignments={edges} me={me} />

      {pageInfo.hasNextPage && (
        <MoreAssignmentsButton
          limit={limit}
          pageInfo={pageInfo}
          fetchMore={fetchMore}
        >
          More
        </MoreAssignmentsButton>
      )}
    </Styled.AssignmentContainer>
  );
};

const MoreAssignmentsButton = ({ limit, pageInfo, fetchMore, children }) => (
  <AssignmentButton
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
            assignments: {
              ...fetchMoreResult.assignments,
              edges: [
                ...previousResult.assignments.edges,
                ...fetchMoreResult.assignments.edges
              ]
            }
          };
        }
      })
    }
  >
    {children}
  </AssignmentButton>
);

const AssignmentButton = styled(Button)`
  margin: auto;
  display: block;
  width: 205px;
  border: 2px solid ${props => props.theme.primaryDark};
`;

const AssignmentList = ({ assignments, me }) => {
  return assignments.map(assignment => (
    <AssignmentItem key={assignment.id} assignment={assignment} me={me} />
  ));
};

const AssignmentItemBase = ({ assignment, session }) => (
  <Styled.AssignmentItemContainer>
    <Styled.CardGrid>
      <Styled.Title>{assignment.assignmentName}</Styled.Title>
      <Styled.Note>{assignment.note}</Styled.Note>
      <Styled.ExternalLink
        href={assignment.link}
        rel="noopener noreferrer"
        target="_blank"
      >
        View Link
      </Styled.ExternalLink>
      <Styled.CreatedInfo>
        <Styled.CreatedAt>
          Created on:{" "}
          <Moment format="YYYY-MM-DD">{assignment.createdAt}</Moment>
        </Styled.CreatedAt>
        <Styled.CreatedBy>
          Created by: {assignment.user.username}
        </Styled.CreatedBy>
      </Styled.CreatedInfo>
      {session && session.me && assignment.user.id === session.me.id && (
        <AssignmentDelete assignment={assignment} />
      )}
    </Styled.CardGrid>
  </Styled.AssignmentItemContainer>
);

const AssignmentItem = withSession(AssignmentItemBase);
export default Assignments;
