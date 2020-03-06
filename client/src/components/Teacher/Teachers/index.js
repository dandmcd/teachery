import React, { Fragment, createRef, useState } from "react";

import { MessageCreate, Messages } from "../../Message";
import AssignmentCreate from "../../Assignment/Assignments/AssignmentCreate";
import Assignments from "../../Assignment/Assignments";
import AssignTask from "../../AssignedTask/AssignedTasks/AssignedTaskCreate";
import AssignTaskUpdate from "../../AssignedTask/AssignedTasks/AssignedTaskEdit";
import TeacherAssignedTasks from "../../AssignedTask/AssignedTasks/AssignedTaskTeacher";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import * as Styled from "./style";
import * as routes from "../../../routing/routes";
import withSession from "../../Session/withSession";
import AssignmentEdit from "../../Assignment/Assignments/AssignmentEdit";
import styled from "styled-components";
import Loading from "../../Alerts/Loading";
import ErrorMessage from "../../Alerts/Error";

const GET_ASSIGNED_STATUS = gql`
  query getAssignedTasksStatus {
    assignedTasksTeacher {
      edges {
        id
        status
        dueDate
      }
    }
  }
`;

const Teacher = ({ session, me }) => {
  const [tasksChecked, setTasksChecked] = useState(false);
  const [assignmentsChecked, setAssignmentsChecked] = useState(false);

  const { data, error, loading } = useQuery(GET_ASSIGNED_STATUS, {});
  if (loading && !data) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const date = moment().format("YYYYMMDD");
  const notComplete = data.assignedTasksTeacher.edges.filter(
    item => item.status === "INCOMPLETE"
  );
  const overdue = notComplete.filter(item =>
    moment(date).isSameOrAfter(item.dueDate)
  ).length;
  const incomplete = notComplete.length;
  const submitted = data.assignedTasksTeacher.edges.filter(
    item => item.status === "SUBMITTED"
  ).length;
  const complete = data.assignedTasksTeacher.edges.filter(
    item => item.status === "COMPLETE"
  ).length;

  const ref = createRef();

  const handleClick = () => {
    if (assignmentsChecked) {
      toggleAssignments();
    }
    toggleAssignedTasks();
    ref.current.scrollIntoView({
      behaivor: "smooth",
      block: "start"
    });
  };

  const toggleAssignedTasks = () => {
    setTasksChecked(tasksChecked === false ? true : false);
  };

  const toggleAssignments = () => {
    setAssignmentsChecked(assignmentsChecked === false ? true : false);
  };

  return (
    <Fragment>
      <AssignmentEdit />
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
          <Styled.Welcome>
            <Link to={routes.ACCOUNT}>{session.me.username}</Link>, you have ...
          </Styled.Welcome>
          <Styled.AssignmentDiv>
            <Styled.Overdue>
              <Styled.OverdueButton>{overdue}</Styled.OverdueButton> overdue
            </Styled.Overdue>
            <Styled.Submitted>
              <Styled.SubmittedButton>{submitted}</Styled.SubmittedButton> tasks
              submitted
            </Styled.Submitted>
            <Styled.Incomplete>
              <Styled.IncompleteButton>{incomplete}</Styled.IncompleteButton>{" "}
              tasks not completed
            </Styled.Incomplete>

            <Styled.NotGraded>
              <Styled.NotGradedButton>{complete}</Styled.NotGradedButton> tasks
              to grade
            </Styled.NotGraded>
          </Styled.AssignmentDiv>
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
      <AssignTask />
      <AssignTaskUpdate />
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
            {!assignmentsChecked ? <AssignmentCreate /> : null}
          </RightItem>
        </Styled.SubMenu>
      </Styled.TeacherHeader>
      {!assignmentsChecked ? <Assignments limit={6} /> : null}
    </Fragment>
  );
};

const RightItem = styled.div`
  margin-left: auto;
`;

export default withSession(Teacher);
