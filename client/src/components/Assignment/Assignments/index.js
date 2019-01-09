import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AssignmentDelete from "../AssignmentDelete";
import Loading from "../../Loading";

const ASSIGNMENT_CREATED = gql`
  subscription {
    assignmentCreated {
      assignment {
        id
        assignment_name
        description
        url
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

const GET_PAGINATED_ASSIGNMENTS_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    assignments(cursor: $cursor, limit: $limit)
      @connection(key: "AssignmentsConnection") {
      edges {
        id
        assignment_name
        description
        url
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const Assignments = ({ limit, me }) => (
  <Query query={GET_PAGINATED_ASSIGNMENTS_WITH_USERS} variables={{ limit }}>
    {({ data, loading, error, fetchMore, subscribeToMore }) => {
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
          <AssignmentList
            assignments={edges}
            me={me}
            subscribeToMore={subscribeToMore}
          />

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
  subscribeToMoreAssignment = () => {
    this.props.subscribeToMore({
      document: ASSIGNMENT_CREATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult;
        }

        const { assignmentCreated } = subscriptionData.data;

        return {
          ...previousResult,
          assignments: {
            ...previousResult.assignments,
            edges: [
              assignmentCreated.assignment,
              ...previousResult.assignments.edges
            ]
          }
        };
      }
    });
  };

  componentDidMount() {
    this.subscribeToMoreAssignment();
  }

  render() {
    const { assignments, me } = this.props;

    return assignments.map(assignment => (
      <AssignmentItem key={assignment.id} assignment={assignment} me={me} />
    ));
  }
}

const AssignmentItem = ({ assignment, me }) => (
  <div>
    <h3>{assignment.user.username}</h3>
    <small>{assignment.createdAt}</small>
    <p>{assignment.assignment_name}</p>
    <p>{assignment.description}</p>

    {me && assignment.user.id === me.id && (
      <AssignmentDelete assignment={assignment} />
    )}
  </div>
);

export default Assignments;
