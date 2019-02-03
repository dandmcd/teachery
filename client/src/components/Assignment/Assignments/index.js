import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";

import AssignmentDelete from "../AssignmentDelete";
import Loading from "../../Loading";
import withSession from "../../Session/withSession";
import GET_PAGINATED_ASSIGNMENTS_WITH_USERS from "../AssignmentSchema";

const Assignments = ({ limit, me }) => (
  <Query query={GET_PAGINATED_ASSIGNMENTS_WITH_USERS} variables={{ limit }}>
    {({ data, loading, error, fetchMore }) => {
      if (!data) {
        return <div>There are no assignments yet ...</div>;
      }

      const { assignments } = data;

      if (loading || !assignments) {
        return <Loading />;
      }

      const { edges, pageInfo } = assignments;

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
    <p>{assignment.assignment_name}</p>
    <p>{assignment.description}</p>

    {session && session.me && assignment.user.id === session.me.id && (
      <AssignmentDelete assignment={assignment} />
    )}
  </div>
);

const AssignmentItem = withSession(AssignmentItemBase);

export default Assignments;
