import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";

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
import { useAtom } from "jotai";
import { deckIdAtom, modalAtom } from "../../../../state/store";
import teststudent from "../../../../assets/teststudent.jpg";
import DeckEdit from "../../Decks/DeckEdit";

export const CardList = ({ match, session }) => {
  let { id } = match.params;
  id = parseInt(id);

  const [modal, setModal] = useAtom(modalAtom);
  const [, setDeckId] = useAtom(deckIdAtom);
  console.log(modal);
  useEffect(() => {
    setDeckId(id);
  }, [id, setDeckId]);

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
    deck: { cards, deckName, description, deckImageUrl },
  } = cardData;

  const toggleOnModal = (e) => {
    if (e.target.id === "deckedit") {
      setModal(
        (m) =>
          (m = {
            ...m,
            toggleOn: true,
            modalId: id,
            target: e.target.id,
          })
      );
    }
    setModal(
      (m) =>
        (m = {
          ...m,
          toggleOn: true,
          modalId: id,
          target: e.target.id,
        })
    );
  };

  let authorizedRole;

  if (session && session.me && session.me.role === "ADMIN") {
    authorizedRole = true;
  } else if (session && session.me && session.me.id === cardData.deck.user.id) {
    authorizedRole = true;
  }

  return (
    <Fragment>
      <DeckEdit />
      <Header>
        <GoBack message="Go Back" />
        <CardEdit />
        <Menu>
          {deckImageUrl === null ? (
            <DeckImg deckImg={teststudent} alt="Deck Logo" />
          ) : (
            <DeckImg deckImg={deckImageUrl} />
          )}
          <Title>Card Listing for {deckName}</Title>
          <Description>{description}</Description>
          <DeckCards>
            <CardCount>
              <CardCountButton>{cards.length}</CardCountButton> Cards
            </CardCount>
            {authorizedRole && (
              <Button id="addcard" type="button" onClick={toggleOnModal}>
                Add Card
              </Button>
            )}
            {authorizedRole && (
              <AddCardButton
                id="deckedit"
                type="button"
                onClick={toggleOnModal}
              >
                Edit Details
              </AddCardButton>
            )}
            <CardCreate key={cardData.deck.id} deck={cardData.deck} />
          </DeckCards>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto auto;
  gap: 5px 5px;
  grid-template-areas:
    "img title"
    "img desc"
    "img cards";
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h2`
  grid-area: title;
  margin: 0.2em auto 0.2em 0.2em;
  margin-left: 0.2em;
  letter-spacing: 0.05em;
  line-height: 1.2;
  text-decoration: underline;
  -webkit-text-decoration-color: ${(props) => props.theme.primary};
  text-decoration-color: ${(props) => props.theme.primary};
`;

const Description = styled.h3`
  grid-area: desc;
  margin-left: 0.2em;
  line-height: 1;
`;

const AddCardButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.secondary};
`;

const DeckCards = styled.div`
  grid-area: cards;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const CardCount = styled.div`
  padding: 0.3em 0;
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

const DeckImg = styled.div`
  grid-area: img;
  background-image: url(${(props) => props.deckImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border: none;
  /* width: 330px;
  height: 200px; */
  background-color: ${(props) => props.theme.container};
`;

export default withSession(
  withAuthorization((session) => session && session.me)(withRouter(CardList))
);
