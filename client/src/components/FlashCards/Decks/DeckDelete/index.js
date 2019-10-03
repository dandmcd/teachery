import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Button from "../../../../theme/Button";
import GET_PAGINATED_DECKS_WITH_USERS from "../DeckSchema";

const DELETE_DECK = gql`
  mutation($id: ID!) {
    deleteDeck(id: $id)
  }
`;

const DeleteButton = styled(Button)`
  border: 2px solid ${props => props.theme.error};
  color: #233841;
  :hover {
    color: white;
    background: #b11a1a;
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
      <DeleteButton
        type="button"
        onClick={e => {
          if (
            window.confirm(
              "Are you sure you wish to delete this deck and all cards associated with it?"
            )
          )
            deleteDeck(e);
        }}
      >
        Delete Deck
      </DeleteButton>
    )}
  </Mutation>
);

export default DeckDelete;
