import React from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import Moment from "react-moment";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import withSession from "../../Session/withSession";
import Loading from "../../Loading";
import * as Styled from "./style";
import ErrorMessage from "../../Alerts/Error";
import Button from "../../../theme/Button";
import GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS from "../../Assignment/AssignmentAdmin/AssignTaskUpdate/AssignTaskUpdateSchema";

const TeacherAssignedTasks = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS,
    {
      variables: { limit }
    }
  );
  console.log(data);
  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return <div>There are no assignments right now ...</div>;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.assignedTasksTeacher;

  return (
    <Styled.AssignmentContainer>
      <AssignedTaskList assignedTasksTeacher={edges} me={me} />

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

TeacherAssignedTasks.propTypes = {
  limit: PropTypes.number.isRequired,
  me: PropTypes.object
};

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
            assignedTasksTeacher: {
              ...fetchMoreResult.assignedTasksTeacher,
              edges: [
                ...previousResult.assignedTasksTeacher.edges,
                ...fetchMoreResult.assignedTasksTeacher.edges
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

MoreAssignedTasksButton.propTypes = {
  limit: PropTypes.number.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

const AssignedTaskList = ({ assignedTasksTeacher, me }) => {
  return assignedTasksTeacher.map(assignedTask => (
    <AssignedTaskItem
      key={assignedTask.id}
      assignedTask={assignedTask}
      me={me}
    />
  ));
};

AssignedTaskList.propTypes = {
  assignedTasksTeacher: PropTypes.array.isRequired,
  me: PropTypes.object
};

const AssignmentItemBase = ({
  assignedTask: {
    dueDate,
    id,
    status,
    createdAt,
    assignedTo,
    assignedToName,
    updatedDocumentName,
    updatedDocumentUrl,
    assignment: {
      assignmentName,
      link,
      note,
      user: { username }
    }
  },
  session
}) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleAssignUpdate @client
    }
  `);
  const { toggleAssignUpdate } = data;

  // const isValidUrl = () => {
  //   try {
  //     new URL(updatedDocumentUrl);
  //     return true;
  //   } catch (_) {
  //     return false;
  //   }
  // }

  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleAssignUpdate: !toggleAssignUpdate,
        current: id
      }
    });
    console.log(data);
  };
  return (
    <Styled.AssignmentItemContainer>
      <Styled.CardGrid>
        <Styled.Title>{assignmentName}</Styled.Title>
        <Styled.Status status={status}>{status}</Styled.Status>
        <Styled.DueDate>Due: {dueDate}</Styled.DueDate>
        <div>Assigned to: {assignedToName}</div>
        <Styled.Note>{note}</Styled.Note>

        <Styled.ExternalLink
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Link
        </Styled.ExternalLink>
        {updatedDocumentUrl === null ? (
          <h5>File: Not yet uploaded</h5>
        ) : (
          <h5>File: Already Uploaded</h5>
        )}
        <Button type="button" onClick={togglePopupModal}>
          Edit
        </Button>
        <Styled.CreatedInfo>
          <Styled.CreatedAt>
            Created on: <Moment format="YYYY-MM-DD">{createdAt}</Moment>
          </Styled.CreatedAt>
          <Styled.CreatedBy>Created by: {username}</Styled.CreatedBy>
        </Styled.CreatedInfo>
      </Styled.CardGrid>
    </Styled.AssignmentItemContainer>
  );
};

AssignmentItemBase.propTypes = {
  assignedTask: PropTypes.object.isRequired,
  me: PropTypes.object
};

const AssignedTaskItem = withSession(AssignmentItemBase);

export default TeacherAssignedTasks;
