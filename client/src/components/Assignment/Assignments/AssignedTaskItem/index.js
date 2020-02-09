import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import * as Styled from "../style";
import download from "../../../../assets/download.png";

const AssignedTaskItemBase = ({
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
        <Styled.Note>{note}</Styled.Note>
        {link !== null ? (
          <Styled.ExternalLink
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            View Link
          </Styled.ExternalLink>
        ) : null}
        <Styled.CreatedInfo>
          <Styled.CreatedAt>
            Created on: <Moment format="YYYY-MM-DD">{createdAt}</Moment>
          </Styled.CreatedAt>
          <Styled.CreatedBy>Created by: {username}</Styled.CreatedBy>

          <Styled.AssignedTo>Assigned to: {assignedToName}</Styled.AssignedTo>
        </Styled.CreatedInfo>
        <Styled.EditButton type="button" onClick={togglePopupModal}>
          Edit
        </Styled.EditButton>
        {fileStatus === "noFile" ? (
          <Styled.FileUploadStatus>
            <DownloadIcon src={download} /> Not yet uploaded
          </Styled.FileUploadStatus>
        ) : null}
        {fileStatus === "uploadedFile" ? (
          <Styled.FileUploadStatus>
            <a
              href={updatedDocumentUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <DownloadIcon src={download} /> View uploaded file
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
              <DownloadIcon src={download} /> View graded file
            </a>
          </Styled.FileUploadStatus>
        ) : null}
      </Styled.CardGrid>
    </Styled.AssignmentItemContainer>
  );
};

AssignedTaskItemBase.propTypes = {
  assignedTask: PropTypes.object.isRequired,
  me: PropTypes.object
};

const DownloadIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export default AssignedTaskItemBase;
