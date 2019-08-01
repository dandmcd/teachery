import React, { useState } from "react";
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

const DeckCreate = () => {
  const [toggleMutate, setToggleMutate] = useState(false);
  const [deckState, setDeckState] = useState({
    deckName: "",
    description: ""
  });

  const { deckName, description } = deckState;

  const onSubmit = async (e, createDeck) => {
    e.preventDefault();

    try {
      setDeckState({ deckName: "", description: "" });
      await createDeck();
    } catch (error) {}
  };

  const onChange = e =>
    setDeckState({ ...deckState, [e.target.name]: e.target.value });

  return (
    <div>
      {!toggleMutate && (
        <button type="button" onClick={() => setToggleMutate(true)}>
          Create a new Deck
        </button>
      )}

      {toggleMutate && (
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
            <form onSubmit={e => onSubmit(e, createDeck)}>
              <textarea
                name="deckName"
                value={deckName}
                onChange={onChange}
                type="text"
                placeholder="Your deck name ... (REQUIRED)"
              />
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                type="text"
                placeholder="Add details and descriptions ..."
              />
              <button type="submit">Submit</button>

              {error && <ErrorMessage error={error} />}
            </form>
          )}
        </Mutation>
      )}
    </div>
  );
};

export default DeckCreate;
