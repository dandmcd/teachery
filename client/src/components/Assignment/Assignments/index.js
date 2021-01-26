import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Moment from "react-moment";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useAtom } from "jotai";
import { modalAtom } from "../../../state/store";

import withSession from "../../Session/withSession";
import GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS from "./AssignmentSchema";
import AssignmentDelete from "./AssignmentDelete";
import Loading from "../../Alerts/Loading";
import * as Styled from "./style";
import ErrorMessage from "../../Alerts/Error";
import Button from "../../../theme/Button";
import download from "../../../assets/download.png";

const Assignments = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS,
    {
      variables: { limit },
    }
  );
  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return (
      <Styled.Container>
        <Styled.EmptyText>
          You haven't created any assignments. Create one now by clicking the
          New Assignment button above!
        </Styled.EmptyText>
      </Styled.Container>
    );
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.assignments;

  return (
    <>
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
    </>
  );
};

Assignments.propTypes = {
  limit: PropTypes.number.isRequired,
  me: PropTypes.object,
};

const MoreAssignmentsButton = ({ limit, pageInfo, fetchMore, children }) => {
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
          assignments: {
            ...fetchMoreResult.assignments,
            edges: [
              ...previousResult.assignments.edges,
              ...fetchMoreResult.assignments.edges,
            ],
          },
        };
      },
    });

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
};

MoreAssignmentsButton.propTypes = {
  limit: PropTypes.number.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

const AssignmentButton = styled(Button)`
  margin: auto;
  display: block;
  width: 205px;
  border: 2px solid ${(props) => props.theme.primaryDark};
`;

const AssignmentList = ({ assignments, me }) => {
  return (
    <Styled.AssignmentContainer>
      {assignments.map((assignment) => (
        <AssignmentItem key={assignment.id} assignment={assignment} me={me} />
      ))}
    </Styled.AssignmentContainer>
  );
};

AssignmentList.propTypes = {
  assignments: PropTypes.array.isRequired,
  me: PropTypes.object,
};

const AssignmentItemBase = ({ assignment, session }) => {
  const [, setModal] = useAtom(modalAtom);

  const [isChecked, setIsChecked] = useState(false);

  const toggleEditMenu = () => {
    setIsChecked(isChecked === false ? true : false);
  };

  let fileStatus;
  if (assignment.documentUrl !== null) {
    fileStatus = "uploadedFile";
  } else {
    fileStatus = "noFile";
  }

  const toggleOnModal = (e) => {
    setModal(
      (m) =>
        (m = {
          ...m,
          toggleOn: true,
          modalId: assignment.id,
          target: e.target.id,
          editFileText: assignment.documentUrl != null ? "Change" : "Add Image",
        })
    );
  };

  return (
    <Styled.AssignmentItemContainer>
      <Styled.CardGrid>
        <Styled.Title>{assignment.assignmentName}</Styled.Title>
        <Styled.Note>{assignment.note}</Styled.Note>
        <Styled.LinkCell>
          {assignment.link !== null ? (
            <Styled.ExternalLink
              href={assignment.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              View Link
            </Styled.ExternalLink>
          ) : null}
        </Styled.LinkCell>
        <Styled.CreatedInfo>
          <Styled.CreatedAt>
            Created on:{" "}
            <Moment format="YYYY-MM-DD">{assignment.createdAt}</Moment>
          </Styled.CreatedAt>
          <Styled.CreatedBy>
            Created by: {assignment.user.username}
          </Styled.CreatedBy>
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
            {session && session.me && assignment.user.id === session.me.id && (
              <AssignmentDelete assignment={assignment} />
            )}
            <Styled.EditButton id="edit" type="button" onClick={toggleOnModal}>
              Edit
            </Styled.EditButton>

            <Styled.AssignButton
              id="assign"
              type="button"
              onClick={toggleOnModal}
            >
              Assign Task
            </Styled.AssignButton>
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
              href={assignment.documentUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Styled.DownloadIcon src={download} /> View file
            </a>
          </Styled.FileUploadStatus>
        ) : null}
      </Styled.CardGrid>
    </Styled.AssignmentItemContainer>
  );
};

AssignmentItemBase.propTypes = {
  assignment: PropTypes.object.isRequired,
  me: PropTypes.object,
};

const AssignmentItem = withSession(AssignmentItemBase);

export default Assignments;
