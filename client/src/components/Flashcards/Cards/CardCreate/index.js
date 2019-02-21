import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "../../../Error";

const CREATE_CARD = gql`
  mutation($deckId: Int!, $front: String!, $back: String!) {
    createCard(deckId: $deckId, front: $front, back: $back) {
      id
      front
      back
      createdAt
    }
  }
`;

class CardCreate extends Component {
  state = {
    deckId: 0,
    front: "",
    back: ""
  };

  onChange = event => {
    const { name, value, type } = event.target;

    this.setState({
      [name]: type === "number" ? parseInt(value, 10) : value
    });
  };

  onSubmit = async (event, createCard) => {
    event.preventDefault();

    try {
      await createCard();
      this.setState({
        deckId: 0,
        front: "",
        back: ""
      });
    } catch (error) {}
    console.log(this.state);
  };

  render() {
    const { deckId, front, back } = this.state;
    console.log(this.state);
    return (
      <Mutation mutation={CREATE_CARD} variables={{ deckId, front, back }}>
        {(createCard, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, createCard)}>
            <input
              name="deckId"
              value={deckId}
              onChange={this.onChange}
              type="number"
              placeholder="Deck id ... (REQUIRED)"
            />
            <textarea
              name="front"
              value={front}
              onChange={this.onChange}
              type="text"
              placeholder="Face of the flashcard ... (REQUIRED)"
            />
            <textarea
              name="back"
              value={back}
              onChange={this.onChange}
              type="text"
              placeholder="Back of the card ..."
            />
            <button type="submit">Submit</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default CardCreate;
