import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";

import withSession from "../../Session/withSession";
import GET_PAGINATED_ASSIGNMENTS_WITH_USERS from "../AssignmentSchema";
import AssignmentDelete from "../AssignmentDelete";
import Loading from "../../Loading";

const Assignments = ({ limit, me }) => (
  <Query query={GET_PAGINATED_ASSIGNMENTS_WITH_USERS} variables={{ limit }}>
    {({ data, loading, error, fetchMore }) => {
      if (!data) {
        return <div>There are no assignments yet ...</div>;
      }

      const { assignedTasks } = data;
      console.log(assignedTasks);

      if (loading || !assignedTasks) {
        return <Loading />;
      }

      const { edges, pageInfo } = assignedTasks;
      console.log(edges);
      return (
        <Fragment>
          <AssignmentList assignedTasks={edges} me={me} />

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
            assignedTasks: {
              ...fetchMoreResult.assignedTasks,
              edges: [
                ...previousResult.assignedTasks.edges,
                ...fetchMoreResult.assignedTasks.edges
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
    const { assignedTasks, me } = this.props;
    console.log(assignedTasks);
    return assignedTasks.map(assignedTask => (
      <AssignmentItem
        key={assignedTask.id}
        assignedTask={assignedTask}
        me={me}
      />
    ));
  }
}

const AssignmentItemBase = ({
  assignedTask: {
    dueDate,
    id,
    status,
    createdAt,
    assignment: { assignmentName, link, note }
  },
  session
}) => (
  <div>
    <h3>{assignmentName}</h3>
    <strong>{dueDate}</strong>
    <p>
      <a href="{link}">{link}</a>
    </p>
    <p>{note}</p>
    <p>{status}</p>
  </div>
);

const AssignmentItem = withSession(AssignmentItemBase);

export default Assignments;
