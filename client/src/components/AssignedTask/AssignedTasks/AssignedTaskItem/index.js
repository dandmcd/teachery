import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import * as Styled from "../style";
import download from "../../../../assets/download.png";
import downloadblue from "../../../../assets/downloadblue.png";

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
      documentName,
      documentUrl,
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
  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleAssignUpdate: !toggleAssignUpdate,
        current: id
      }
    });
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

        {status === "INCOMPLETE" && (
          <Styled.EditButton type="button" onClick={togglePopupModal}>
            Update
          </Styled.EditButton>
        )}
        {fileStatus === "noFile" ? (
          <Styled.FileUploadStatus>
            <Styled.DownloadIcon src={download} /> No file uploaded
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

AssignedTaskItemBase.propTypes = {
  assignedTask: PropTypes.object.isRequired,
  me: PropTypes.object
};

const DownloadLink = styled.a`
  font-weight: 400;
  color: ${props => props.theme.secondary};
`;

export default AssignedTaskItemBase;
