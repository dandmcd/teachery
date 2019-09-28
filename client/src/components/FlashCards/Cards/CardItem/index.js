import React from "react";
import Moment from "react-moment";
import styled from "styled-components";

import withSession from "../../../Session/withSession";
import CardDelete from "../CardDelete";

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
  background-image: -webkit-linear-gradient(left, #c51d1d, #faf9f9);
`;

const ALink = styled.a`
  color: ${props => props.theme.primaryMed};
`;

const CardItem = ({ card, deckUserId, session }) => {
  console.log(
    deckUserId + " " + session + " " + session.me + " " + session.me.id
  );
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
      {session && session.me && deckUserId === session.me.id && (
        <CardDelete card={card} />
      )}
      <Hr />
    </CardListContainer>
  );
};

export default withSession(CardItem);
