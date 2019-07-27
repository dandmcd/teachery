import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";

import withSession from "../../Session/withSession";
import GET_PAGINATED_ASSIGNMENTS_WITH_USERS from "../AssignmentSchema";
import Loading from "../../Loading";

const AssignedTasks = ({ limit, me }) => (
  <Query query={GET_PAGINATED_ASSIGNMENTS_WITH_USERS} variables={{ limit }}>
    {({ data, loading, error, fetchMore }) => {
      if (!data) {
        return <div>There are no assignments yet ...</div>;
      }

      const { assignedTasks } = data;

      if (loading || !assignedTasks) {
        return <Loading />;
      }

      const { edges, pageInfo } = assignedTasks;
      return (
        <Fragment>
          <AssignedTaskList assignedTasks={edges} me={me} />

          {pageInfo.hasNextPage && (
            <MoreAssignedTasksButton
              limit={limit}
              pageInfo={pageInfo}
              fetchMore={fetchMore}
            >
              More
            </MoreAssignedTasksButton>
          )}
        </Fragment>
      );
    }}
  </Query>
);

const MoreAssignedTasksButton = ({ limit, pageInfo, fetchMore, children }) => (
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

class AssignedTaskList extends Component {
  render() {
    const { assignedTasks, me } = this.props;
    return assignedTasks.map(assignedTask => (
      <AssignedTaskItem
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

    <p>{note}</p>
    <p>{status}</p>
    <p>
      <a href={link} rel="noopener noreferrer" target="_blank">
        View Link
      </a>
    </p>
  </div>
);

const AssignedTaskItem = withSession(AssignmentItemBase);

export default AssignedTasks;
