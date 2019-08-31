import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import GET_PAGINATED_DECKS_WITH_USERS from "../DeckSchema";

const DELETE_DECK = gql`
  mutation($id: ID!) {
    deleteDeck(id: $id)
  }
`;

const Button = styled.button`
  width: 105px;
  background: none;
  border-radius: 4px;
  border: 2px solid ${props => props.theme.error};
  color: #233841;
  margin: 0.2em;
  padding: 0.25em 1em;
  font-size: 0.8em;
  transition: all 0.3s ease-in-out;
  transform: scale(1);
  display: inline-table;
  will-change: transform;
  cursor: pointer;
  :hover {
    color: white;
    background: #b11a1a;
    transform: scale(1.05) perspective(1px);
  }
  :disabled {
    color: rgba(35, 56, 65, 0.5);
    border: 2px solid rgba(35, 56, 65, 0.3);
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
      <Button type="button" onClick={deleteDeck}>
        Delete Deck
      </Button>
    )}
  </Mutation>
);

export default DeckDelete;
