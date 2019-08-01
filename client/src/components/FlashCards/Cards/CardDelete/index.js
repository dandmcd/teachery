import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import GET_PAGINATED_DECKS_WITH_USERS from "../../Decks/DeckSchema";

const DELETE_CARD = gql`
  mutation($id: ID!) {
    deleteCard(id: $id)
  }
`;

const CardDelete = ({ card }) => (
  <Mutation
    mutation={DELETE_CARD}
    variables={{ id: card.id }}
    update={cache => {
      const data = cache.readQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS
      });

      cache.writeQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS,
        data: {
          ...data,
          cards: {
            ...data.cards,
            edges: data.cards.edges.filter(node => node.id !== card.id),
            pageInfo: data.cards.pageInfo
          }
        }
      });
    }}
  >
    {(deleteCard, { data, loading, error }) => (
      <button type="button" onClick={deleteCard}>
        Delete
      </button>
    )}
  </Mutation>
);

export default CardDelete;
