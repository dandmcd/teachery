import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";

import GET_PAGINATED_ASSIGNMENTS_WITH_USERS from "./AssignedTaskSchema";
import Loading from "../../Alerts/Loading";
import ErrorMessage from "../../Alerts/Error";
import Button from "../../../theme/Button";
import AssignedTaskList from "./AssignedTaskList";
import NoData from "../../Alerts/NoData";

const AssignedTasks = ({ limit, me }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_PAGINATED_ASSIGNMENTS_WITH_USERS,
    {
      variables: { limit },
    }
  );

  if (loading && !data) {
    return <Loading />;
  } else if (!data) {
    return (
      <NoData
        title="No Assigned Tasks"
        message="There are no assignments to complete right now.  Please check back later!"
      />
    );
  } else if (data.assignedTasks === null) {
    return (
      <NoData
        title="No Assigned Tasks"
        message="There are no assignments to complete right now.  Please check back later!"
      />
    );
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { edges, pageInfo } = data.assignedTasks;

  return (
    <>
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
    </>
  );
};

AssignedTasks.propTypes = {
  limit: PropTypes.number.isRequired,
  me: PropTypes.object,
};

const MoreAssignedTasksButton = ({ limit, pageInfo, fetchMore, children }) => (
  <AssignmentButton
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          limit,
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
                ...fetchMoreResult.assignedTasks.edges,
              ],
            },
          };
        },
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
  border: 2px solid ${(props) => props.theme.primaryDark};
`;

MoreAssignedTasksButton.propTypes = {
  limit: PropTypes.number.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default AssignedTasks;
