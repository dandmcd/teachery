import React, { Fragment } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

import GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS from "../AssignmentAdmin/AssignmentAdminSchema";
import Button from "../../../theme/Button";
import ErrorMessage from "../../Alerts/Error";

const DELETE_ASSIGNMENT = gql`
  mutation($id: ID!) {
    deleteAssignment(id: $id)
  }
`;

const AssignmentDelete = ({ assignment }) => {
  const [deleteAssignment, { error }] = useMutation(DELETE_ASSIGNMENT, {
    update(
      cache,
      {
        data: { deleteAssignment }
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
            edges: data.assignments.edges.filter(
              node => node.id !== assignment.id
            ),
            pageInfo: data.assignments.pageInfo
          }
        }
      });
    }
  });

  const onSubmit = (e, deleteAssignment) => {
    e.preventDefault();
    deleteAssignment({
      variables: {
        id: assignment.id
      }
    });
  };

  return (
    <Fragment>
      <RemoveAssignmentButton
        type="button"
        onClick={e => {
          if (
            window.confirm(
              "Are you sure you wish to delete this assignment?  All users will be no longer able to view it."
            )
          )
            onSubmit(e, deleteAssignment);
        }}
      >
        Delete
      </RemoveAssignmentButton>
      {error && <ErrorMessage error={error} />}
    </Fragment>
  );
};

AssignmentDelete.propTypes = {
  assignment: PropTypes.object.isRequired
};

const RemoveAssignmentButton = styled(Button)`
  border: 2px solid ${props => props.theme.error};
`;

export default AssignmentDelete;
