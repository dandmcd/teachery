import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { useQuery, useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import Button from "../../../../theme/Button";
import * as Styled from "../style";

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

AssignedTaskItemBase.propTypes = {
  assignedTask: PropTypes.object.isRequired,
  me: PropTypes.object
};

export default AssignedTaskItemBase;
