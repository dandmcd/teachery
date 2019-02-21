import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "../../../Error";
import GET_PAGINATED_DECKS_WITH_USERS from "../DeckSchema";

const CREATE_DECK = gql`
  mutation($deckName: String!, $description: String!) {
    createDeck(deckName: $deckName, description: $description) {
      id
      deckName
      description
      createdAt
      user {
        id
        username
      }
      cards {
        id
        front
        back
      }
      tags {
        id
        tagName
      }
    }
  }
`;

class DeckCreate extends Component {
  state = {
    deckName: "",
    description: ""
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event, createDeck) => {
    event.preventDefault();

    try {
      await createDeck();
      this.setState({ deckName: "", description: "" });
    } catch (error) {}
  };

  render() {
    const { deckName, description } = this.state;

    return (
      <Mutation
        mutation={CREATE_DECK}
        variables={{ deckName, description }}
        update={(cache, { data: { createDeck } }) => {
          const data = cache.readQuery({
            query: GET_PAGINATED_DECKS_WITH_USERS
          });

          cache.writeQuery({
            query: GET_PAGINATED_DECKS_WITH_USERS,
            data: {
              ...data,
              decks: {
                ...data.decks,
                edges: [createDeck, ...data.decks.edges],
                pageInfo: data.decks.pageInfo
              }
            }
          });
        }}
      >
        {(createDeck, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, createDeck)}>
            <textarea
              name="deckName"
              value={deckName}
              onChange={this.onChange}
              type="text"
              placeholder="Your deck name ... (REQUIRED)"
            />
            <textarea
              name="description"
              value={description}
              onChange={this.onChange}
              type="text"
              placeholder="Add details and descriptions ..."
            />
            <button type="submit">Submit</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default DeckCreate;
