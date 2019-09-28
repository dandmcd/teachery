import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Button from "../../../../theme/Button";
import GET_PAGINATED_DECKS_WITH_USERS from "../../Decks/DeckSchema";

const DELETE_CARD = gql`
  mutation($id: ID!) {
    deleteCard(id: $id)
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
      <DeleteButton
        type="button"
        onClick={e => {
          if (window.confirm("Are you sure you wish to delete this card?"))
            deleteCard(e);
        }}
      >
        Delete Card
      </DeleteButton>
    )}
  </Mutation>
);

export default CardDelete;
