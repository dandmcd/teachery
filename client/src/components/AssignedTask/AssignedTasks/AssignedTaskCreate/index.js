import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

import useOuterClickNotifier from "../../../Alerts/OuterClickNotifier";
import ErrorMessage from "../../../Alerts/Error";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import * as Styled from "../../../../theme/Popup";
import GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS from "../AssignedTaskTeacherSchema";

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
      assignmentId
      status
      dueDate
      createdAt
      assignedTo
      assignedToName
      updatedDocumentName
      updatedDocumentUrl
      user {
        id
        username
      }
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
  status: "",
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
        status: "",
      });
    }
  }, [assignment, assignmentId]);

  const [assignTask, { loading, error }] = useMutation(CREATE_ASSIGNED_TASK, {
    onError: (err) => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: (data) => {
      client.writeData({ data: { toggleSuccess: true } });
    },
    update(cache, { data: { assignTask } }) {
      const data = cache.readQuery({
        query: GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS,
      });
      cache.writeQuery({
        query: GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS,
        data: {
          ...data,
          assignedTasksTeacher: {
            ...data.assignedTasksTeacher,
            edges: [assignTask, ...data.assignedTasksTeacher.edges],
            pageInfo: data.assignedTasksTeacher.pageInfo,
          },
        },
      });
    },
  });

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, assignTask) => {
    e.preventDefault();
    try {
      await assignTask({
        variables: {
          assignmentId: parseInt(assignmentId),
          assignedTo: assignedTo,
          dueDate: dueDate,
          status: status,
        },
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
            <Styled.PopupHeader>
              <Styled.PopupTitle>
                Assign a task for a student ...
              </Styled.PopupTitle>
              <Styled.PopupFooterButton onClick={togglePopupModal}>
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              <form onSubmit={(e) => onSubmit(e, assignTask)}>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>
                      Student's Email or Username
                    </Styled.LabelName>
                  </Styled.Span>
                  <Styled.Input
                    name="assignedTo"
                    value={assignedTo}
                    onChange={onChange}
                    type="text"
                  />
                </Styled.Label>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>Due Date</Styled.LabelName>
                  </Styled.Span>
                  <Styled.Input
                    name="dueDate"
                    value={dueDate}
                    onChange={onChange}
                    type="date"
                  />
                </Styled.Label>
                <Styled.Select>
                  <Styled.SelectBox
                    name="status"
                    value={status}
                    onChange={onChange}
                    type="text"
                    placeholder="Set Task Status"
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    {menuItems.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Styled.SelectBox>
                </Styled.Select>
                {loading && <Loading />}
                <Styled.Submission>
                  <Styled.SubmitButton type="submit">
                    Submit
                  </Styled.SubmitButton>
                </Styled.Submission>
                {toggleSuccess && (
                  <SuccessMessage message="Assigned Task Created!" />
                )}
                {error && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Container>
  );
};

AssignTask.propTypes = {
  assignment: PropTypes.object,
};

const Container = styled.div``;

export default AssignTask;
