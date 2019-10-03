import React, { Fragment } from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Button from "../../../../theme/Button";
import Loading from "../../../Loading";
import ErrorMessage from "../../../Alerts/Error";

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

const CardDelete = ({ card, setIsSuccess }) => {
  const [deleteCard, { loading, error }] = useMutation(DELETE_CARD, {
    onError: err => {
      setIsSuccess(false);
    },
    onCompleted: data => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  });

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

export default CardDelete;
