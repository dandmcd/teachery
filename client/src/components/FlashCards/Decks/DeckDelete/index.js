import React, { Fragment } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../../../../theme/Button";
import GET_PAGINATED_DECKS_WITH_USERS from "../DeckSchema";
import ErrorMessage from "../../../Alerts/Error";

const DELETE_DECK = gql`
  mutation($id: ID!) {
    deleteDeck(id: $id)
  }
`;

const DeckDelete = ({ deck }) => {
  const [deleteDeck, { error }] = useMutation(DELETE_DECK, {
    update(cache, { data: { deleteDeck } }) {
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
    }
  });

  const onSubmit = (e, deleteDeck) => {
    e.preventDefault();
    deleteDeck({
      variables: { id: deck.id }
    });
  };

  return (
    <Fragment>
      <DeleteButton
        type="button"
        onClick={e => {
          if (
            window.confirm(
              "Are you sure you wish to delete this deck and all cards associated with it?"
            )
          )
            onSubmit(e, deleteDeck);
        }}
      >
        Delete Deck
      </DeleteButton>
      {error && <ErrorMessage error={error} />}
    </Fragment>
  );
};

DeckDelete.propTypes = {
  deck: PropTypes.object.isRequired
};

const DeleteButton = styled(Button)`
  border: 2px solid ${props => props.theme.error};
  color: ${props => props.theme.text};
  :hover {
    color: white;
    background: ${props => props.theme.primaryDark};
  }
`;

export default DeckDelete;
