import React, { Fragment, useEffect } from "react";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../../../../theme/Button";
import Loading from "../../../Loading";
import ErrorMessage from "../../../Alerts/Error";

const DELETE_CARD = gql`
  mutation($id: ID!) {
    deleteCard(id: $id)
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

  const [deleteCard, { loading, error }] = useMutation(DELETE_CARD, {
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
      variables: { id: card.id },
      refetchQueries: ["CardsQuery"]
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
  color: #233841;
  :hover {
    color: white;
    background: #b11a1a;
  }
`;

export default CardDelete;
