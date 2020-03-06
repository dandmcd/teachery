import React, { useState, Fragment } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Button from "../../../../theme/Button";
import withSession from "../../../Session/withSession";
import CardDelete from "../CardDelete";
import * as Styled from "./style";

const CardItem = ({ card, deckId, deckUserId, session }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleEditCard @client
    }
  `);
  const { toggleEditCard } = data;

  const [cardChecked, setCardChecked] = useState(false);

  const toggleCardSection = () => {
    setCardChecked(cardChecked === false ? true : false);
  };

  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleEditCard: !toggleEditCard,
        current: card.id
      }
    });
  };

  return (
    <Fragment>
      <Styled.Header>
        <Styled.SubMenu>
          <Styled.PopupFooterButton
            type="checkbox"
            title={cardChecked ? "Collapse" : "Expand"}
            checked={cardChecked}
            onClick={toggleCardSection}
          >
            <Styled.CloseSpan cardChecked={cardChecked} />
          </Styled.PopupFooterButton>
          <Styled.SubTitle>{card.front}</Styled.SubTitle>
        </Styled.SubMenu>
      </Styled.Header>
      {cardChecked ? (
        <Styled.Container>
          <CardField>
            Card Front: <Styled.Span>{card.front}</Styled.Span>
          </CardField>
          <CardField>
            Card Back: <Styled.Span>{card.back}</Styled.Span>
          </CardField>
          {card.pictureUrl != null ? (
            <CardField>
              Image:{" "}
              <a
                href={card.pictureUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <CardInfo>{card.pictureUrl}</CardInfo>
              </a>
            </CardField>
          ) : null}
          <Created>
            Created on:{" "}
            <Moment format="YYYY-MM-DD HH:mm">{card.createdAt}</Moment>
          </Created>
          <EditButton type="button" onClick={togglePopupModal}>
            Edit
          </EditButton>
          {session && session.me && deckUserId === session.me.id && (
            <CardDelete card={card} deckId={deckId} />
          )}
        </Styled.Container>
      ) : null}
    </Fragment>
  );
};

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
  deckUserId: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired
};

const CardField = styled.h4`
  margin-left: 10px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const CardInfo = styled.h5`
  margin-top: 3px;
  margin-bottom: 6px;
  color: ${props => props.theme.primaryMed};
`;

const Created = styled.h6`
  margin-left: 10px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: ${props => props.theme.textLight};
`;

const EditButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
`;

export default withSession(CardItem);
