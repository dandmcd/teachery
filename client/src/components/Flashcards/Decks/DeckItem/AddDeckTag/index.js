import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "../../../../Error";

const ADD_TAG_TO_DECK = gql`
  mutation($id: ID!, $tagName: String!) {
    addTagToDeck(id: $id, tagName: $tagName) {
      id
      tags {
        id
        tagName
      }
    }
  }
`;

class AddDeckTag extends Component {
  state = {
    id: 0,
    tagName: ""
  };

  onChange = event => {
    const { name, value, type } = event.target;

    this.setState({
      [name]: type === "number" ? parseInt(value, 10) : value
    });
  };

  onSubmit = async (event, addTagToDeck) => {
    event.preventDefault();

    try {
      await addTagToDeck();
      this.setState({
        id: 0,
        tagName: ""
      });
    } catch (error) {}
    console.log(this.state);
  };

  render() {
    const { id, tagName } = this.state;
    console.log(this.state);
    return (
      <Mutation mutation={ADD_TAG_TO_DECK} variables={{ id, tagName }}>
        {(addTagToDeck, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, addTagToDeck)}>
            <input
              name="id"
              value={id}
              onChange={this.onChange}
              type="number"
              placeholder="Deck id to add tag ... (REQUIRED)"
            />
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

export default AddDeckTag;
