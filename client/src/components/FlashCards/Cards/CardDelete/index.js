import React, { useEffect } from "react";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { useAtom } from "jotai";

import Button from "../../../../theme/Button";
import Loading from "../../../Alerts/Loading";
import ErrorMessage from "../../../Alerts/Error";
import CARDS_QUERY from "../CardList/CardListSchema/CardListSchema";
import { deckIdAtom } from "../../../../state/store";

const DELETE_CARD = gql`
  mutation($id: ID!, $deckId: Int!) {
    deleteCard(id: $id, deckId: $deckId)
  }
`;

const CardDelete = ({ card }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleDeleteSuccess @client
    }
  `);
  const { toggleDeleteSuccess } = data;

  const [deckId] = useAtom(deckIdAtom);

  const [deleteCard, { loading, error }] = useMutation(DELETE_CARD, {
    optimisticResponse: {
      __typename: "Mutation",
      deleteCard: {
        id: card.id,
      },
    },

    update(cache, { data: { deleteCard } }) {
      const localData = cloneDeep(
        cache.readQuery({
          query: CARDS_QUERY,
          variables: { id: deckId },
        })
      );

      localData.deck.cards = localData.deck.cards.filter(
        (item) => item.id !== card.id
      );

      cache.writeQuery({
        query: CARDS_QUERY,
        variables: { id: deckId, __typeName: "Deck" },
        data: { ...localData },
      });
    },
    onError: (err) => {
      client.writeData({ data: { toggleDeleteSuccess: false } });
    },
    onCompleted: (data) => {
      client.writeData({ data: { toggleDeleteSuccess: true } });
    },
  });

  useEffect(() => {
    if (toggleDeleteSuccess) {
      setTimeout(() => {
        client.writeData({
          data: { toggleDeleteSuccess: !toggleDeleteSuccess },
        });
      }, 5000);
    }
  }, [client, toggleDeleteSuccess]);

  const onSubmit = (e, deleteCard) => {
    e.preventDefault();
    deleteCard({
      variables: { id: card.id, deckId: deckId },
    });
  };

  return (
    <>
      <DeleteButton
        type="button"
        onClick={(e) => {
          if (window.confirm("Are you sure you wish to delete this card?"))
            onSubmit(e, deleteCard);
        }}
      >
        Delete Card
      </DeleteButton>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
    </>
  );
};

CardDelete.propTypes = {
  card: PropTypes.object.isRequired,
};

const DeleteButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.error};
  :hover {
    color: white;
    background: ${(props) => props.theme.primaryDark};
  }
`;

export default CardDelete;
