import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS from "../AssignmentAdmin/AssignmentAdminSchema";

const DELETE_ASSIGNMENT = gql`
  mutation($id: ID!) {
    deleteAssignment(id: $id)
  }
`;

const AssignmentDelete = ({ assignment }) => (
  <Mutation
    mutation={DELETE_ASSIGNMENT}
    variables={{ id: assignment.id }}
    update={cache => {
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
    }}
  >
    {(deleteAssignment, { data, loading, error }) => (
      <button type="button" onClick={deleteAssignment}>
        Delete
      </button>
    )}
  </Mutation>
);

export default AssignmentDelete;
