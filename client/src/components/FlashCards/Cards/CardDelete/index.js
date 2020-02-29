import React, { Fragment, useEffect } from "react";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";

import Button from "../../../../theme/Button";
import Loading from "../../../Loading";
import ErrorMessage from "../../../Alerts/Error";
import CARDS_QUERY from "../CardList/CardListSchema/CardListSchema";

const DELETE_CARD = gql`
  mutation($id: ID!) {
    deleteCard(id: $id)
  }
`;

const CardDelete = ({ card, deckId }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleDeleteSuccess @client
    }
  `);
  const { toggleDeleteSuccess } = data;

  const [deleteCard, { loading, error }] = useMutation(DELETE_CARD, {
    update(cache, { data: { deleteCard } }) {
      const localData = cloneDeep(
        cache.readQuery({
          query: CARDS_QUERY,
          variables: { id: deckId }
        })
      );
      console.log(localData);

      localData.deck.cards = localData.deck.cards.filter(
        item => item.id !== card.id
      );

      //      localData.deck.cards = [...localData.deck.cards, createCard];
      console.log(localData.deck.id);
      cache.writeQuery({
        query: CARDS_QUERY,
        variables: { id: deckId, __typeName: "Deck" },
        data: { ...localData }
      });
      console.log(localData);
    },
    onError: err => {
      client.writeData({ data: { toggleDeleteSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleDeleteSuccess: true } });
    }
  });

  useEffect(() => {
    if (toggleDeleteSuccess) {
      setTimeout(() => {
        client.writeData({
          data: { toggleDeleteSuccess: !toggleDeleteSuccess }
        });
      }, 5000);
    }
  }, [client, toggleDeleteSuccess]);

  const onSubmit = (e, deleteCard) => {
    e.preventDefault();
    deleteCard({
      variables: { id: card.id }
    });
  };

  return (
    <Fragment>
      <DeleteButton
        type="button"
        onClick={e => {
          if (window.confirm("Are you sure you wish to delete this card?"))
            onSubmit(e, deleteCard);
        }}
      >
        Delete Card
      </DeleteButton>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
    </Fragment>
  );
};

CardDelete.propTypes = {
  card: PropTypes.object.isRequired
};

const DeleteButton = styled(Button)`
  border: 2px solid ${props => props.theme.error};
  :hover {
    color: white;
    background: ${props => props.theme.primaryDark}
  }
`;

export default CardDelete;
