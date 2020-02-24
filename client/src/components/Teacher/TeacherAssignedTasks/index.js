import React, { Fragment, useState } from "react";
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
import AssignedTaskDelete from "../../Assignment/AssignmentAdmin/AssignedTaskDelete";
import download from "../../../assets/download.png";
import downloadblue from "../../../assets/downloadblue.png";
import NoData from "../../Alerts/NoData";

const TeacherAssignedTasks = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS,
    {
      variables: { limit }
    }
  );

  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return (
      <NoData
        title="No Assigned Tasks"
        message="There are no assigned tasks right now."
      />
    );
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.assignedTasksTeacher;

  return (
    <Fragment>
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
    </Fragment>
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
  margin: auto auto 5px auto;
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
  return (
    <Styled.AssignmentContainer>
      {assignedTasksTeacher.map(assignedTask => (
        <AssignedTaskItem
          key={assignedTask.id}
          assignedTask={assignedTask}
          me={me}
        />
      ))}
    </Styled.AssignmentContainer>
  );
};

AssignedTaskList.propTypes = {
  assignedTasksTeacher: PropTypes.array.isRequired,
  me: PropTypes.object
};

const AssignmentItemBase = ({ assignedTask, session }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleAssignUpdate @client
    }
  `);
  const { toggleAssignUpdate } = data;
  const {
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
      documentName,
      documentUrl,
      user: { username }
    }
  } = assignedTask;

  const [isChecked, setIsChecked] = useState(false);

  let fileStatus;
  if (updatedDocumentUrl !== null) {
    if (status === "SUBMITTED" || "COMPLETE") {
      fileStatus = "uploadedFile";
    }
    if (status === "GRADED") {
      fileStatus = "gradedFile";
    }
  } else {
    fileStatus = "noFile";
  }
  console.log(fileStatus);

  const toggleEditMenu = () => {
    setIsChecked(isChecked === false ? true : false);
  };

  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleAssignUpdate: !toggleAssignUpdate,
        current: id
      }
    });
  };

  console.log(documentUrl);

  return (
    <Styled.AssignmentItemContainer>
      <Styled.CardGrid>
        <Styled.Title>{assignmentName}</Styled.Title>
        <Styled.Status status={status}>{status}</Styled.Status>
        <Styled.DueDate dueDate={dueDate}>Due: {dueDate}</Styled.DueDate>
        <Styled.Note>{note}</Styled.Note>
        <Styled.LinkCell>
          {documentUrl !== null ? (
            <Styled.FileStatus>
              <DownloadLink
                href={documentUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Styled.DownloadIcon src={downloadblue} /> View
              </DownloadLink>
            </Styled.FileStatus>
          ) : null}
          {link !== null ? (
            <Styled.ExternalLink
              href={link}
              rel="noopener noreferrer"
              target="_blank"
            >
              View Link
            </Styled.ExternalLink>
          ) : null}
        </Styled.LinkCell>
        <Styled.CreatedInfo>
          <Styled.CreatedAt>
            Created on: <Moment format="YYYY-MM-DD">{createdAt}</Moment>
          </Styled.CreatedAt>
          <Styled.CreatedBy>Created by: {username}</Styled.CreatedBy>

          <Styled.AssignedTo>Assigned to: {assignedToName}</Styled.AssignedTo>
        </Styled.CreatedInfo>
        <Styled.EditDropDown>
          <Styled.ManageButton
            type="checkbox"
            checked={isChecked}
            onClick={toggleEditMenu}
            onChange={toggleEditMenu}
          >
            Manage
          </Styled.ManageButton>
          <Styled.EditDropDownContent isChecked={isChecked}>
            <AssignedTaskDelete assignedTask={assignedTask} />
            <Styled.EditButton type="button" onClick={togglePopupModal}>
              Edit
            </Styled.EditButton>
          </Styled.EditDropDownContent>
        </Styled.EditDropDown>
        {fileStatus === "noFile" ? (
          <Styled.FileUploadStatus>
            <Styled.DownloadIcon src={download} /> Not yet uploaded
          </Styled.FileUploadStatus>
        ) : null}
        {fileStatus === "uploadedFile" ? (
          <Styled.FileUploadStatus>
            <a
              href={updatedDocumentUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Styled.DownloadIcon src={download} /> View uploaded file
            </a>
          </Styled.FileUploadStatus>
        ) : null}
        {fileStatus === "gradedFile" ? (
          <Styled.FileUploadStatus>
            <a
              href={updatedDocumentUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Styled.DownloadIcon src={download} /> View graded file
            </a>
          </Styled.FileUploadStatus>
        ) : null}
      </Styled.CardGrid>
    </Styled.AssignmentItemContainer>
  );
};

AssignmentItemBase.propTypes = {
  assignedTask: PropTypes.object.isRequired,
  me: PropTypes.object
};

const DownloadLink = styled.a`
  font-weight: 400;
  color: ${props => props.theme.secondary};
`;

const AssignedTaskItem = withSession(AssignmentItemBase);

export default TeacherAssignedTasks;
