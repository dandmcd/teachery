import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Moment from "react-moment";
import styled from "styled-components";
import PropTypes from "prop-types";

import withSession from "../../../Session/withSession";
import Loading from "../../../Alerts/Loading";
import * as Styled from "./style";
import ErrorMessage from "../../../Alerts/Error";
import Button from "../../../../theme/Button";
import GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS from "../AssignedTaskTeacherSchema";
import AssignedTaskDelete from "../AssignedTaskDelete";
import download from "../../../../assets/download.png";
import downloadblue from "../../../../assets/downloadblue.png";
import noteIcon from "../../../../assets/note.png";

import { useAtom } from "jotai";
import { modalAtom } from "../../../../state/store";

const TeacherAssignedTasks = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS,
    {
      variables: { limit },
    }
  );

  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return (
      <Styled.Container>
        <ErrorMessage customError="You haven't assigned any tasks.  You can assign a task to a student by clicking Manage on any assignment below, and choosing 'Assign Task'" />
      </Styled.Container>
    );
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.assignedTasksTeacher;

  return (
    <>
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
    </>
  );
};

TeacherAssignedTasks.propTypes = {
  limit: PropTypes.number.isRequired,
  me: PropTypes.object,
};

const MoreAssignedTasksButton = ({ limit, pageInfo, fetchMore, children }) => {
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
          assignedTasksTeacher: {
            ...fetchMoreResult.assignedTasksTeacher,
            edges: [
              ...previousResult.assignedTasksTeacher.edges,
              ...fetchMoreResult.assignedTasksTeacher.edges,
            ],
          },
        };
      },
    });
  };
  return (
    <AssignmentButton
      type="button"
      onMouseOver={fetchEvent}
      onClick={fetchEvent}
    >
      {children}
    </AssignmentButton>
  );
};

const AssignmentButton = styled(Button)`
  margin: auto auto 5px auto;
  display: block;
  width: 205px;
  border: 2px solid ${(props) => props.theme.primaryDark};
`;

MoreAssignedTasksButton.propTypes = {
  limit: PropTypes.number.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

const AssignedTaskList = ({ assignedTasksTeacher, me }) => {
  return (
    <Styled.AssignmentContainer>
      {assignedTasksTeacher.map((assignedTask) => (
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
  me: PropTypes.object,
};

const AssignmentItemBase = ({ assignedTask, session }) => {
  const [, setModal] = useAtom(modalAtom);

  const {
    dueDate,
    id,
    status,
    createdAt,
    assignedToName,
    updatedDocumentUrl,
    assignment: {
      assignmentName,
      link,
      note,
      documentUrl,
      user: { username },
    },
    notes,
  } = assignedTask;

  const [isChecked, setIsChecked] = useState(false);

  let fileStatus;
  if (updatedDocumentUrl !== null) {
    if (status === "REVIEWING" || "COMPLETE") {
      fileStatus = "uploadedFile";
    }
    if (status === "GRADED") {
      fileStatus = "gradedFile";
    }
  } else {
    fileStatus = "noFile";
  }

  const toggleEditMenu = () => {
    setIsChecked(isChecked === false ? true : false);
  };

  const toggleOnModal = (e) => {
    setModal(
      (m) =>
        (m = {
          ...m,
          toggleOn: true,
          modalId: id,
          target: e.target.id,
          editFileText: updatedDocumentUrl != null ? "Change" : "Add File",
        })
    );
  };

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
              <Styled.DownloadLink
                href={documentUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Styled.DownloadIcon src={downloadblue} /> View Assignment
              </Styled.DownloadLink>
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
            <Styled.EditButton
              id="assigntaskedit"
              type="button"
              onClick={toggleOnModal}
            >
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
        <Styled.NoteButton id="notemodal" type="button" onClick={toggleOnModal}>
          <Styled.NoteIcon src={noteIcon} /> {notes.length}
          {notes.length !== 1 ? " Notes" : " Note"}
        </Styled.NoteButton>
      </Styled.CardGrid>
    </Styled.AssignmentItemContainer>
  );
};

AssignmentItemBase.propTypes = {
  assignedTask: PropTypes.object.isRequired,
  session: PropTypes.object,
};

const AssignedTaskItem = withSession(AssignmentItemBase);

export default TeacherAssignedTasks;
