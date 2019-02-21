import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "../../../../Error";

const CREATE_TAG = gql`
  mutation($tagName: String!) {
    createTag(tagName: $tagName) {
      id
      tagName
      createdAt
    }
  }
`;

class TagCreate extends Component {
  state = {
    tagName: ""
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event, createTag) => {
    event.preventDefault();

    try {
      await createTag();
      this.setState({
        tagName: ""
      });
    } catch (error) {}
    console.log(this.state);
  };

  render() {
    const { tagName } = this.state;
    console.log(this.state);
    return (
      <Mutation mutation={CREATE_TAG} variables={{ tagName }}>
        {(createTag, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, createTag)}>
            <textarea
              name="tagName"
              value={tagName}
              onChange={this.onChange}
              type="text"
              placeholder="Tag Name (REQUIRED)"
            />
            <button type="submit">Submit</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default TagCreate;
