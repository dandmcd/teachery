import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
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

const INITIAL_STATE = {
  assignmentName: "",
  note: "",
  link: ""
};

const AssignmentCreate = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      togglePopup @client
    }
  `);
  const { toggleSuccess, togglePopup } = data;

  const [{ assignmentName, note, link }, setAssignmentState] = useState(
    INITIAL_STATE
  );

  const [createAssignment, { loading, error }] = useMutation(
    CREATE_ASSIGNMENT,
    {
      onError: err => {
        client.writeData({ data: { toggleSuccess: false } });
      },
      onCompleted: data => {
        client.writeData({ data: { toggleSuccess: true } });
      },
      update(
        cache,
        {
          data: { createAssignment }
        }
      ) {
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
      }
    }
  );

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  const onChange = e => {
    const { name, value } = e.target;
    setAssignmentState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, createAssignment) => {
    e.preventDefault();

    try {
      await createAssignment({
        variables: {
          assignmentName: assignmentName,
          note: note,
          link: link
        }
      }).then(async ({ data }) => {
        setAssignmentState({ ...INITIAL_STATE });
      });
    } catch {}
  };

  // Onclick toggle popup for mutation form
  const togglePopupModal = () => {
    client.writeData({ data: { togglePopup: !togglePopup } });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Container>
      <AssignButton type="button" onClick={togglePopupModal}>
        New Assignment
      </AssignButton>
      {togglePopup ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupTitle>Create an assignment ...</Styled.PopupTitle>
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
                {toggleSuccess && (
                  <SuccessMessage message="Assignment Created!" />
                )}
                {error && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
            <Styled.PopupFooterButton onClick={togglePopupModal}>
              Close
            </Styled.PopupFooterButton>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div``;

const AssignButton = styled(Button)`
  font-size: 10px;
`;

export default AssignmentCreate;
