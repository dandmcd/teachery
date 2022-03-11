import React, { createRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useAtom } from "jotai";

import { MessageCreate, Messages } from "../../Message";
import AssignmentCreate from "../../Assignment/Assignments/AssignmentCreate";
import Assignments from "../../Assignment/Assignments";
import AssignTask from "../../AssignedTask/AssignedTasks/AssignedTaskCreate";
import AssignTaskUpdate from "../../AssignedTask/AssignedTasks/AssignedTaskEdit";
import TeacherAssignedTasks from "../../AssignedTask/AssignedTasks/AssignedTaskTeacher";
import * as Styled from "./style";
import withSession from "../../Session/withSession";
import AssignmentEdit from "../../Assignment/Assignments/AssignmentEdit";
import TeacherTaskStatus from "./TeacherTaskStatus";
import { modalAtom } from "../../../state/store";
import NoteList from "../../Note/NoteList";

const Teacher = ({ session, me }) => {
  const [modal, setModal] = useAtom(modalAtom);
  const [tasksChecked, setTasksChecked] = useState(false);
  const [assignmentsChecked, setAssignmentsChecked] = useState(false);

  const ref = createRef();

  const handleClick = () => {
    if (assignmentsChecked) {
      toggleAssignments();
    }
    toggleAssignedTasks();
    ref.current.scrollIntoView({
      behaivor: "smooth",
      block: "start",
    });
  };

  const toggleAssignedTasks = () => {
    setTasksChecked(tasksChecked === false ? true : false);
  };

  const toggleAssignments = () => {
    setAssignmentsChecked(assignmentsChecked === false ? true : false);
  };

  const toggleOnModal = (e) => {
    setModal(
      (m) =>
        (m = {
          ...m,
          toggleOn: true,
          target: e.target.id,
        })
    );
  };

  return (
    <>
      <AssignmentCreate />
      <AssignmentEdit />
      <AssignTask />
      <AssignTaskUpdate />
      {modal.target === "notemodal" && <NoteList />}
      <Styled.TeacherHeader>
        <Styled.Menu>
          <Styled.Title>Teacher Admin</Styled.Title>
          <Styled.ViewButton type="button" onClick={handleClick}>
            View Assignments
          </Styled.ViewButton>
        </Styled.Menu>
      </Styled.TeacherHeader>
      <Styled.Grid>
        <Styled.MessageColumn>
          <Messages limit={3} />
          <MessageCreate />
        </Styled.MessageColumn>
        <Styled.AssignmentItemContainer>
          <TeacherTaskStatus session={session} />
        </Styled.AssignmentItemContainer>
      </Styled.Grid>
      <Styled.TeacherHeader>
        <Styled.SubMenu>
          <Styled.PopupFooterButton
            type="checkbox"
            title={!tasksChecked ? "Collapse" : "Expand"}
            checked={tasksChecked}
            onClick={toggleAssignedTasks}
          >
            <Styled.CloseSpan tasksChecked={tasksChecked} />
          </Styled.PopupFooterButton>
          <Styled.SubTitle>Assigned Tasks</Styled.SubTitle>
        </Styled.SubMenu>
      </Styled.TeacherHeader>

      {!tasksChecked ? <TeacherAssignedTasks limit={6} /> : null}
      <Styled.TeacherHeader>
        <Styled.SubMenu>
          <Styled.PopupFooterButton
            type="checkbox"
            title={!assignmentsChecked ? "Collapse" : "Expand"}
            checked={assignmentsChecked}
            onClick={toggleAssignments}
          >
            <Styled.CloseSpan tasksChecked={assignmentsChecked} />
          </Styled.PopupFooterButton>
          <Styled.SubTitle ref={ref}>Assignments</Styled.SubTitle>
          <RightItem>
            {!assignmentsChecked ? (
              <Styled.AssignmentCreateButton
                id="assignmentcreate"
                type="button"
                onClick={toggleOnModal}
              >
                New Assignment
              </Styled.AssignmentCreateButton>
            ) : null}
          </RightItem>
        </Styled.SubMenu>
      </Styled.TeacherHeader>
      {!assignmentsChecked ? <Assignments limit={6} /> : null}
    </>
  );
};

const RightItem = styled.div`
  margin-left: auto;
`;

Teacher.propTypes = {
  session: PropTypes.object,
  me: PropTypes.object,
};

export default withSession(Teacher);
