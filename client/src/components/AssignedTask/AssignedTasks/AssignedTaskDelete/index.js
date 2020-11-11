import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../../../../theme/Button";
import ErrorMessage from "../../../Alerts/Error";
import GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS from "../AssignedTaskTeacherSchema";

const DELETE_ASSIGNED_TASK = gql`
  mutation($id: ID!) {
    deleteAssignedTask(id: $id)
  }
`;

const AssignedTaskDelete = ({ assignedTask }) => {
  const [deleteAssignedTask, { error }] = useMutation(DELETE_ASSIGNED_TASK, {
    optimisticResponse: {
      __typename: "Mutation",
      deleteAssignedTask: {
        id: assignedTask.id,
      },
    },
    update(cache, { data: { deleteAssignedTask } }) {
      const data = cache.readQuery({
        query: GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS,
      });
      cache.writeQuery({
        query: GET_PAGINATED_ASSIGNED_TASKS_WITH_USERS,
        data: {
          ...data,
          assignedTasksTeacher: {
            ...data.assignedTasksTeacher,
            edges: data.assignedTasksTeacher.edges.filter(
              (node) => node.id !== assignedTask.id
            ),
            pageInfo: data.assignedTasksTeacher.pageInfo,
          },
        },
      });
    },
  });

  const onSubmit = (e, deleteAssignedTask) => {
    e.preventDefault();
    deleteAssignedTask({
      variables: {
        id: assignedTask.id,
      },
    });
  };

  return (
    <>
      <RemoveAssignmentButton
        type="button"
        onClick={(e) => {
          if (
            window.confirm(
              "Are you sure you wish to delete this assigned task?  The student will no longer be able to view it."
            )
          )
            onSubmit(e, deleteAssignedTask);
        }}
      >
        Delete
      </RemoveAssignmentButton>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

AssignedTaskDelete.propTypes = {
  assignedTask: PropTypes.object.isRequired,
};

const RemoveAssignmentButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.error};
`;

export default AssignedTaskDelete;
