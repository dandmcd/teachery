import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import CARDS_QUERY from "./CardListSchema/CardListSchema";
import withAuthorization from "../../../Session/withAuthorization";
import Loading from "../../../Alerts/Loading";
import CardItem from "../CardItem";
import ErrorMessage from "../../../Alerts/Error/index";
import GoBack from "../../../Navigation/GoBack";
import SuccessMessage from "../../../Alerts/Success";
import CardCreate from "../CardCreate";
import CardEdit from "../CardEdit";
import Button from "../../../../theme/Button";
import withSession from "../../../Session/withSession";

export const CardList = ({ match, session }) => {
  let { id } = match.params;
  id = parseInt(id);

  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleAddCard @client
    }
  `);
  const { toggleAddCard } = data;

  const { data: cardData, error, loading } = useQuery(CARDS_QUERY, {
    variables: { id },
  });
  if (loading && !cardData) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }
  const {
    toggleDeleteSuccess,
    deck: { cards, deckName },
  } = cardData;

  const togglePopupModal = () => {
    client.writeData({
      data: { toggleAddCard: !toggleAddCard, current: id },
    });
  };

  let authorizedRole;

  if (session && session.me && session.me.role === "ADMIN") {
    authorizedRole = true;
  } else if (session && session.me && session.me.id === cardData.deck.user.id) {
    authorizedRole = true;
  }

  return (
    <Fragment>
      <Header>
        <Menu>
          <h3>
            <GoBack message="Go Back" />{" "}
          </h3>
          <Title>Card Listing for {deckName}</Title>
          <CardEdit />
          <div>
            <CardCountButton>{cards.length}</CardCountButton> Cards
            {authorizedRole && (
              <AddCardButton type="button" onClick={togglePopupModal}>
                Add Card
              </AddCardButton>
            )}
          </div>

          <CardCreate key={cardData.deck.id} deck={cardData.deck} />
        </Menu>
      </Header>
      {toggleDeleteSuccess && (
        <SuccessMessage message="Card successfully deleted!" />
      )}
      {cards.length === 0 && (
        <div>This deck does not have any cards yet ...</div>
      )}
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          deckId={id}
          authorizedRole={authorizedRole}
        />
      ))}
    </Fragment>
  );
};

CardList.propTypes = {
  props: PropTypes.object,
};

const Header = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

const Menu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-left: 0.2em;
  -webkit-box-flex: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
`;

const AddCardButton = styled(Button)`
  margin-left: 0.7em;
  border: 2px solid ${(props) => props.theme.secondary};
`;

const CardCountButton = styled.button`
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 40px;
  width: 40px;
  max-width: 40px;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  border-style: none;
  color: white;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-filter: brightness(105%);
    filter: brightness(105%);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    background: ${(props) => props.theme.secondaryDark};
  }
`;

export default withSession(
  withAuthorization((session) => session && session.me)(withRouter(CardList))
);
