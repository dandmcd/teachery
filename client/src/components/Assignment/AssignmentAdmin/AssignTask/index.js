import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import useOuterClickNotifier from "../../../Alerts";
import ErrorMessage from "../../../Alerts/Error";
import Loading from "../../../Loading";
import SuccessMessage from "../../../Alerts/Success";
import * as Styled from "../../../../theme/Popup";
import Button from "../../../../theme/Button";

const STATUS_ENUM = gql`
  query {
    __type(name: "Status") {
      name
      enumValues {
        name
      }
    }
  }
`;

const CREATE_ASSIGNED_TASK = gql`
  mutation(
    $assignmentId: Int!
    $assignedTo: String!
    $dueDate: String!
    $status: Status!
  ) {
    assignTask(
      assignmentId: $assignmentId
      assignedTo: $assignedTo
      dueDate: $dueDate
      status: $status
    ) {
      id
      assignedTo
      dueDate
      status
      assignment {
        id
        assignmentName
        note
        link
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

const INITIAL_STATE = {
  id: 0,
  assignedTo: "",
  dueDate: "",
  status: ""
};

const AssignTask = ({ assignment }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleAssign @client
      assignmentId @client
    }
  `);
  const { toggleSuccess, toggleAssign, assignmentId } = data;

  const { data: enumData, loading: enumLoading, error: enumError } = useQuery(
    STATUS_ENUM
  );
  let menuItems = [];
  if (enumLoading || enumError) {
    menuItems = [];
  } else {
    menuItems = enumData.__type.enumValues;
  }

  const [{ assignedTo, dueDate, status }, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (assignment && assignmentId) {
      setState({
        id: assignmentId,
        tagName: "",
        assignedTo: "",
        dueDate: "",
        status: ""
      });
    }
  }, [assignment, assignmentId]);

  const [assignTask, { loading, error }] = useMutation(CREATE_ASSIGNED_TASK, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    }
  });

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, assignTask) => {
    e.preventDefault();
    console.log(data);
    try {
      await assignTask({
        variables: {
          assignmentId: parseInt(assignmentId),
          assignedTo: assignedTo,
          dueDate: dueDate,
          status: status
        }
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });
      });
    } catch {}
  };

  // Onclick toggle popup for mutation form
  const togglePopupModal = () => {
    client.writeData({ data: { toggleAssign: !toggleAssign } });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Container>
      {toggleAssign ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupTitle>
              Create a task for a student ...
            </Styled.PopupTitle>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, assignTask)}>
                <Styled.Input
                  name="assignedTo"
                  value={assignedTo}
                  onChange={onChange}
                  type="email"
                  placeholder="Enter email of student"
                />
                <Styled.Input
                  name="dueDate"
                  value={dueDate}
                  onChange={onChange}
                  type="date"
                  placeholder="Set date due"
                />
                <select
                  name="status"
                  value={status}
                  onChange={onChange}
                  type="text"
                  placeholder="Set status of the task"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  {menuItems.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <Button type="submit">Submit</Button>
                {loading && <Loading />}
                {toggleSuccess && (
                  <SuccessMessage message="Assigned Task Created!" />
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

export default AssignTask;
