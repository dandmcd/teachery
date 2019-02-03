import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "../../Error";
import GET_PAGINATED_ASSIGNMENTS_WITH_USERS from "../AssignmentSchema";

const CREATE_ASSIGNMENT = gql`
  mutation($assignmentname: String!, $note: String, $link: String) {
    createAssignment(
      assignmentname: $assignmentname
      note: $note
      link: $link
    ) {
      id
      assignmentname
      note
      link
      createdAt
      user {
        id
        username
      }
    }
  }
`;

class AssignmentCreate extends Component {
  state = {
    assignmentname: "",
    note: "",
    link: ""
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event, createAssignment) => {
    event.preventDefault();

    try {
      await createAssignment();
      this.setState({ assignmentname: "", note: "", link: "" });
    } catch (error) {}
  };

  render() {
    const { assignmentname, note, link } = this.state;

    return (
      <Mutation
        mutation={CREATE_ASSIGNMENT}
        variables={{ assignmentname, note, link }}
        update={(cache, { data: { createAssignment } }) => {
          const data = cache.readQuery({
            query: GET_PAGINATED_ASSIGNMENTS_WITH_USERS
          });

          cache.writeQuery({
            query: GET_PAGINATED_ASSIGNMENTS_WITH_USERS,
            data: {
              ...data,
              assignments: {
                ...data.assignments,
                edges: [createAssignment, ...data.assignments.edges],
                pageInfo: data.assignments.pageInfo
              }
            }
          });
        }}
      >
        {(createAssignment, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, createAssignment)}>
            <textarea
              name="assignmentname"
              value={assignmentname}
              onChange={this.onChange}
              type="text"
              placeholder="Your assignment name ... (REQUIRED)"
            />
            <textarea
              name="note"
              value={note}
              onChange={this.onChange}
              type="text"
              placeholder="Add details and notes ..."
            />
            <textarea
              name="link"
              value={link}
              onChange={this.onChange}
              type="text"
              placeholder="Add a URL link"
            />
            <button type="submit">Submit</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default AssignmentCreate;
