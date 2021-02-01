import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import * as Styled from "../style";
import * as routes from "../../../../routing/routes";
import Loading from "../../../Alerts/Loading";
import ErrorMessage from "../../../Alerts/Error";

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

const TeacherTaskStatus = ({ session }) => {
  const { data, error, loading } = useQuery(GET_ASSIGNED_STATUS, {});
  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return (
      <ErrorMessage customError="You currently have no assigned tasks to track" />
    );
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const date = moment().format("YYYYMMDD");
  const notComplete = data.assignedTasksTeacher.edges.filter(
    (item) => item.status === "INCOMPLETE"
  );
  const overdue = notComplete.filter((item) =>
    moment(date).isSameOrAfter(item.dueDate)
  ).length;
  const incomplete = notComplete.length;
  const submitted = data.assignedTasksTeacher.edges.filter(
    (item) => item.status === "REVIEWING"
  ).length;
  const complete = data.assignedTasksTeacher.edges.filter(
    (item) => item.status === "COMPLETE"
  ).length;

  return (
    <>
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
          <Styled.IncompleteButton>{incomplete}</Styled.IncompleteButton> tasks
          not completed
        </Styled.Incomplete>

        <Styled.NotGraded>
          <Styled.NotGradedButton>{complete}</Styled.NotGradedButton> tasks to
          grade
        </Styled.NotGraded>
      </Styled.AssignmentDiv>
    </>
  );
};

TeacherTaskStatus.propTypes = {
  session: PropTypes.object,
};

export default TeacherTaskStatus;
