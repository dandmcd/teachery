import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "../../Error";

const CREATE_ASSIGNMENT = gql`
  mutation($assignment_name: String!, $description: String, $url: String) {
    createAssignment(
      assignment_name: $assignment_name
      description: $description
      url: $url
    ) {
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
`;

class AssignmentCreate extends Component {
  state = {
    assignment_name: "",
    description: "",
    url: ""
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event, createAssignment) => {
    event.preventDefault();

    try {
      await createAssignment();
      this.setState({ assignment_name: "", description: "", url: "" });
    } catch (error) {}
  };

  render() {
    const { assignment_name, description, url } = this.state;

    return (
      <Mutation
        mutation={CREATE_ASSIGNMENT}
        variables={{ assignment_name, description, url }}
      >
        {(createAssignment, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, createAssignment)}>
            <textarea
              name="assignment_name"
              value={assignment_name}
              onChange={this.onChange}
              type="text"
              placeholder="Your assignment name ... (REQUIRED)"
            />
            <textarea
              name="description"
              value={description}
              onChange={this.onChange}
              type="text"
              placeholder="Add details and notes ..."
            />
            <textarea
              name="url"
              value={url}
              onChange={this.onChange}
              type="text"
              placeholder="Add a link"
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
