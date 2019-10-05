import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Moment from "react-moment";
import styled from "styled-components";

import withSession from "../../Session/withSession";
import GET_PAGINATED_ASSIGNMENTS_WITH_USERS from "../AssignmentSchema";
import Loading from "../../Loading";
import * as Styled from "./style";
import ErrorMessage from "../../Alerts/Error";
import Button from "../../../theme/Button";

const AssignedTasks = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_ASSIGNMENTS_WITH_USERS,
    { variables: { limit } }
  );
  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return <div>There are no assignments right now ...</div>;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.assignedTasks;

  return (
    <Styled.AssignmentContainer>
      <AssignedTaskList assignedTasks={edges} me={me} />

      {pageInfo.hasNextPage && (
        <MoreAssignedTasksButton
          limit={limit}
          pageInfo={pageInfo}
          fetchMore={fetchMore}
        >
          More
        </MoreAssignedTasksButton>
      )}
    </Styled.AssignmentContainer>
  );
};

const AssignmentButton = styled(Button)`
  margin: auto;
  display: block;
  width: 205px;
  border: 2px solid ${props => props.theme.primaryDark};
`;

const MoreAssignedTasksButton = ({ limit, pageInfo, fetchMore, children }) => (
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
            assignedTasks: {
              ...fetchMoreResult.assignedTasks,
              edges: [
                ...previousResult.assignedTasks.edges,
                ...fetchMoreResult.assignedTasks.edges
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

const AssignedTaskList = ({ assignedTasks, me }) => {
  return assignedTasks.map(assignedTask => (
    <AssignedTaskItem
      key={assignedTask.id}
      assignedTask={assignedTask}
      me={me}
    />
  ));
};

const AssignmentItemBase = ({
  assignedTask: {
    dueDate,
    id,
    status,
    createdAt,
    assignment: {
      assignmentName,
      link,
      note,
      user: { username }
    }
  },
  session
}) => (
  <Styled.AssignmentItemContainer>
    <Styled.CardGrid>
      <Styled.Title>{assignmentName}</Styled.Title>
      <Styled.Status status={status}>{status}</Styled.Status>
      <Styled.DueDate>Due: {dueDate}</Styled.DueDate>

      <Styled.Note>{note}</Styled.Note>

      <Styled.ExternalLink
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        View Link
      </Styled.ExternalLink>
      <Styled.CreatedInfo>
        <Styled.CreatedAt>
          Created on: <Moment format="YYYY-MM-DD">{createdAt}</Moment>
        </Styled.CreatedAt>
        <Styled.CreatedBy>Created by: {username}</Styled.CreatedBy>
      </Styled.CreatedInfo>
    </Styled.CardGrid>
  </Styled.AssignmentItemContainer>
);

const AssignedTaskItem = withSession(AssignmentItemBase);

export default AssignedTasks;
