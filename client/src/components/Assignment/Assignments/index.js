import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";

import GET_PAGINATED_ASSIGNMENTS_WITH_USERS from "../AssignmentSchema";
import Loading from "../../Loading";
import ErrorMessage from "../../Alerts/Error";
import Button from "../../../theme/Button";
import AssignedTaskList from "./AssignedTaskList";

const AssignedTasks = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_ASSIGNMENTS_WITH_USERS,
    {
      variables: { limit }
    }
  );

  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return <div>There are no assignments right now ...</div>;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.assignedTasks;

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
};

AssignedTasks.propTypes = {
  limit: PropTypes.number.isRequired,
  me: PropTypes.object
};

const MoreAssignedTasksButton = ({ limit, pageInfo, fetchMore, children }) => (
  <AssignmentButton
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
  </AssignmentButton>
);

const AssignmentButton = styled(Button)`
  margin: auto;
  display: block;
  width: 205px;
  border: 2px solid ${props => props.theme.primaryDark};
`;

MoreAssignedTasksButton.propTypes = {
  limit: PropTypes.number.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

export default AssignedTasks;
