import React, { useState, useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "../../../Error";
import GET_PAGINATED_DECKS_WITH_USERS from "../../Decks/DeckSchema/index";

const CREATE_CARD = gql`
  mutation($deckId: Int!, $front: String!, $back: String) {
    createCard(deckId: $deckId, front: $front, back: $back) {
      id
      front
      back
      createdAt
    }
  }
`;

const CardCreate = ({ deck }) => {
  const [state, setState] = useState({
    deckId: null,
    front: "",
    back: ""
  });

  const { deckId, front, back } = state;
  const onSubmit = async (e, createCard) => {
    e.preventDefault();

    try {
      setState({
        deckId: parseInt(deck.id, 10),
        front: "",
        back: ""
      });
      await createCard();
    } catch (error) {}
  };

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  useEffect(() => {
    if (deck && deck.id) {
      setState({ deckId: parseInt(deck.id, 10) });
    }
  }, [deck]);

  const isInvalid = front === "" || undefined;
  console.log(front);
  return (
    <Mutation
      mutation={CREATE_CARD}
      variables={{ deckId, front, back }}
      refetchQueries={[
        { query: GET_PAGINATED_DECKS_WITH_USERS, variables: { limit: 3 } }
      ]}
    >
      {(createCard, { data, loading, error }) => (
        <form onSubmit={e => onSubmit(e, createCard)}>
          <textarea
            name="front"
            value={front}
            onChange={onChange}
            type="text"
            placeholder="Face of the flashcard ... (REQUIRED)"
          />
          <textarea
            name="back"
            value={back}
            onChange={onChange}
            type="text"
            placeholder="Back of the card ..."
          />
          <button disabled={isInvalid} type="submit">
            Submit
          </button>

          {error && <ErrorMessage error={error} />}
        </form>
      )}
    </Mutation>
  );
};

export default CardCreate;
