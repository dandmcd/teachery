import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import { useAtom } from "jotai";
import { modalAtom, successAlertAtom } from "../../../../state/store";

import { STATUS_ENUM, CREATE_ASSIGNED_TASK } from "./schema";
import ErrorMessage from "../../../Alerts/Error";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import * as Styled from "../../../../theme/Popup";
import GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS from "../AssignedTaskTeacherSchema";
import Modal from "../../../Modal";

const INITIAL_STATE = {
  id: 0,
  assignedTo: "",
  dueDate: "",
  status: "",
};

const AssignTask = ({ assignment }) => {
  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, modalId, target } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);

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
    if (assignment && modalId) {
      setState({
        id: modalId,
        tagName: "",
        assignedTo: "",
        dueDate: "",
        status: "",
      });
    }
  }, [assignment, modalId]);

  const [assignTask, { loading, error }] = useMutation(CREATE_ASSIGNED_TASK, {
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
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
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert((a) => (a = false));
      }, 5000);
    }
  }, [successAlert, setSuccessAlert]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, assignTask) => {
    e.preventDefault();
    try {
      await assignTask({
        variables: {
          assignmentId: parseInt(modalId),
          assignedTo: assignedTo,
          dueDate: dueDate,
          status: status,
        },
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });
      });
    } catch {}
  };

  const toggleOffModal = () => {
    setModal((m) => (m = { ...m, toggleOn: false, editImg: false }));
    setSuccessAlert((a) => (a = false));
  };

  return (
    <>
      {toggleOn && target === "assign" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>
              Assign a task for a student ...
            </Styled.PopupTitle>
            <Styled.PopupFooterButton onClick={toggleOffModal}>
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
                <Styled.SubmitButton type="submit">Submit</Styled.SubmitButton>
              </Styled.Submission>
              {successAlert && (
                <SuccessMessage message="Assigned Task Created!" />
              )}
              {error && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

AssignTask.propTypes = {
  assignment: PropTypes.object,
};

export default AssignTask;
