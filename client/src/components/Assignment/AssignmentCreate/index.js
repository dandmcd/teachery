import React, { useState, useRef } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import useOuterClickNotifier from "../../Alerts";
import ErrorMessage from "../../Alerts/Error";
import GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS from "../AssignmentAdmin/AssignmentAdminSchema";
import Loading from "../../Loading";
import SuccessMessage from "../../Alerts/Success";
import * as Styled from "../../../theme/Popup";
import Button from "../../../theme/Button";

const CREATE_ASSIGNMENT = gql`
  mutation($assignmentName: String!, $note: String, $link: String) {
    createAssignment(
      assignmentName: $assignmentName
      note: $note
      link: $link
    ) {
      id
      assignmentName
      note
      link
      createdAt
      user {
        id
        username
      }
      assignedTasks {
        status
        dueDate
      }
    }
  }
`;
const Container = styled.div``;

const AssignButton = styled(Button)`
  font-size: 10px;
`;

const AssignmentCreate = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [assignmentState, setAssignmentState] = useState({
    assignmentName: "",
    note: "",
    link: ""
  });

  const { assignmentName, note, link } = assignmentState;

  const onChange = e => {
    setAssignmentState({ ...assignmentState, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event, createAssignment) => {
    event.preventDefault();

    try {
      await createAssignment();
      setAssignmentState({ assignmentName: "", note: "", link: "" });
    } catch (error) {}
  };

  const togglePopup = () => {
    setShowPopup(false);
  };

  const innerRef = useRef(null);
  useOuterClickNotifier(e => setShowPopup(false), innerRef);

  return (
    <Container>
      <AssignButton type="button" onClick={() => setShowPopup(true)}>
        New Assignment
      </AssignButton>
      {showPopup ? (
        <Mutation
          mutation={CREATE_ASSIGNMENT}
          variables={{ assignmentName, note, link }}
          onError={data => setIsSuccess(false)}
          onCompleted={data => {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 5000);
          }}
          update={(cache, { data: { createAssignment } }) => {
            const data = cache.readQuery({
              query: GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS
            });

            cache.writeQuery({
              query: GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS,
              data: {
                ...data,
                assignments: {
                  ...data.assignments,
                  edges: [createAssignment, ...data.assignments.edges],
                  pageInfo: data.assignments.pageInfo
                }
              }
            });
          }}
        >
          {(createAssignment, { data, loading, error }) => (
            <Styled.PopupContainer>
              <Styled.PopupInner ref={innerRef}>
                <Styled.PopupTitle>Create an assignment...</Styled.PopupTitle>
                <Styled.PopupBody>
                  <form onSubmit={e => onSubmit(e, createAssignment)}>
                    <Styled.Input
                      name="assignmentName"
                      value={assignmentName}
                      onChange={onChange}
                      type="text"
                      placeholder="Assignment Name*"
                    />
                    <Styled.InputTextArea
                      name="note"
                      value={note}
                      onChange={onChange}
                      type="text"
                      placeholder="Add details and notes"
                    />
                    <Styled.Input
                      name="link"
                      value={link}
                      onChange={onChange}
                      type="text"
                      placeholder="Add a URL link"
                    />
                    <Button type="submit">Submit</Button>
                    {loading && <Loading />}
                    {isSuccess && (
                      <SuccessMessage message="Assignment Created!" />
                    )}
                    {error && <ErrorMessage error={error} />}
                  </form>
                </Styled.PopupBody>
                <Styled.PopupFooterButton onClick={togglePopup}>
                  Close
                </Styled.PopupFooterButton>
              </Styled.PopupInner>
            </Styled.PopupContainer>
          )}
        </Mutation>
      ) : null}
    </Container>
  );
};

export default AssignmentCreate;
