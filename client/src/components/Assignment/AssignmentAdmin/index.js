import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";

import withSession from "../../Session/withSession";
import GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS from "../AssignmentAdmin/AssignmentAdminSchema";
import AssignmentDelete from "../AssignmentDelete";
import Loading from "../../Loading";
const Assignments = ({ limit, me }) => (
  <Query
    query={GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS}
    variables={{ limit }}
  >
    {({ data, loading, error, fetchMore }) => {
      if (!data) {
        return <div>There are no assignments yet ...</div>;
      }

      const { assignments } = data;
      console.log(assignments);

      if (loading || !assignments) {
        return <Loading />;
      }

      const { edges, pageInfo } = assignments;

      console.log(edges);
      return (
        <Fragment>
          <AssignmentList assignments={edges} me={me} />

          {pageInfo.hasNextPage && (
            <MoreAssignmentsButton
              limit={limit}
              pageInfo={pageInfo}
              fetchMore={fetchMore}
            >
              More
            </MoreAssignmentsButton>
          )}
        </Fragment>
      );
    }}
  </Query>
);
const MoreAssignmentsButton = ({ limit, pageInfo, fetchMore, children }) => (
  <button
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          limit
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            assignments: {
              ...fetchMoreResult.assignments,
              edges: [
                ...previousResult.assignments.edges,
                ...fetchMoreResult.assignments.edges
              ]
            }
          };
        }
      })
    }
  >
    {children}
  </button>
);

class AssignmentList extends Component {
  render() {
    const { assignments, me } = this.props;

    return assignments.map(assignment => (
      <AssignmentItem key={assignment.id} assignment={assignment} me={me} />
    ));
  }
}

const AssignmentItemBase = ({ assignment, session }) => (
  <div>
    <h3>{assignment.user.username}</h3>
    <small>{assignment.createdAt}</small>
    <p>{assignment.assignmentName}</p>
    <p>{assignment.note}</p>
    <p>{assignment.link}</p>

    {session && session.me && assignment.user.id === session.me.id && (
      <AssignmentDelete assignment={assignment} />
    )}
  </div>
);

const AssignmentItem = withSession(AssignmentItemBase);
export default Assignments;
