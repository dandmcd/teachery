import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Button from "../../../../theme/Button";
import withSession from "../../../Session/withSession";
import CardDelete from "../CardDelete";

const CardItem = ({ card, deckId, deckUserId, session }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleEditCard @client
    }
  `);
  const { toggleEditCard } = data;

  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleEditCard: !toggleEditCard,
        current: card.id
      }
    });
    console.log(data);
  };

  return (
    <CardListContainer>
      <CardField>Card Front: </CardField>
      <CardInfo>{card.front}</CardInfo>
      <CardField>Card Back: </CardField>
      <CardInfo>{card.back}</CardInfo>
      {card.pictureUrl != null ? (
        <h5>
          Image:{" "}
          <ALink
            href={card.pictureUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <CardInfo>{card.pictureUrl}</CardInfo>
          </ALink>
        </h5>
      ) : null}
      <Created>
        Created on: <Moment format="YYYY-MM-DD HH:mm">{card.createdAt}</Moment>
      </Created>
      <EditButton type="button" onClick={togglePopupModal}>
        Edit
      </EditButton>
      {session && session.me && deckUserId === session.me.id && (
        <CardDelete card={card} deckId={deckId} />
      )}
      <Hr />
    </CardListContainer>
  );
};

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
  deckUserId: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired
};

const CardListContainer = styled.div``;

const CardField = styled.h4`
  margin: 0;
`;

const CardInfo = styled.h5`
  margin-top: 3px;
  margin-bottom: 6px;
  color: ${props => props.theme.primaryMed};
`;

const Created = styled.h6`
  margin-top: 6px;
  margin-bottom: 6px;
  color: ${props => props.theme.textLight};
`;

const Hr = styled.hr`
  padding: 0;
  border: none;
  height: 2px;
  background-image: -webkit-linear-gradient(
    left,
    ${props => props.theme.primary},
    ${props => props.theme.neutralLight}
  );
`;

const ALink = styled.a`
  color: ${props => props.theme.primaryMed};
`;

const EditButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
`;

export default withSession(CardItem);
