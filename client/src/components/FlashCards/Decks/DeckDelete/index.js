import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import GET_PAGINATED_DECKS_WITH_USERS from "../DeckSchema";

const DELETE_DECK = gql`
  mutation($id: ID!) {
    deleteDeck(id: $id)
  }
`;

const DeckDelete = ({ deck }) => (
  <Mutation
    mutation={DELETE_DECK}
    variables={{ id: deck.id }}
    update={cache => {
      const data = cache.readQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS
      });

      cache.writeQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS,
        data: {
          ...data,
          decks: {
            ...data.decks,
            edges: data.decks.edges.filter(node => node.id !== deck.id),
            pageInfo: data.decks.pageInfo
          }
        }
      });
    }}
  >
    {(deleteDeck, { data, loading, error }) => (
      <button type="button" onClick={deleteDeck}>
        Delete Deck
      </button>
    )}
  </Mutation>
);

export default DeckDelete;
