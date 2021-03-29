import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
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
import {
  deckIdAtom,
  modalAtom,
  successAlertAtom,
} from "../../../../state/store";
import teststudent from "../../../../assets/teststudent.jpg";
import DeckEdit from "../../Decks/DeckEdit";
import * as Styled from "./style";

export const CardList = ({ match, session }) => {
  let { id } = match.params;
  id = parseInt(id);

  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn } = modal;
  const [, setDeckId] = useAtom(deckIdAtom);
  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);

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
    deck: { cards, deckName, description, deckImageUrl },
  } = cardData;

  const toggleOnModal = (e) => {
    setSuccessAlert((a) => (a = false));
    if (e.target.id === "deckedit") {
      setModal(
        (m) =>
          (m = {
            ...m,
            toggleOn: true,
            modalId: id,
            target: e.target.id,
            editFileText: deckImageUrl != null ? "Change" : "Add Image",
          })
      );
    } else if (e.target.id === "addcard") {
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
  };

  let authorizedRole;

  if (session && session.me && session.me.role === "ADMIN") {
    authorizedRole = true;
  } else if (session && session.me && session.me.id === cardData.deck.user.id) {
    authorizedRole = true;
  }

  return (
    <>
      <DeckEdit />
      <Styled.Header>
        <GoBack message="Go Back" />
        <CardEdit />
        <Styled.Menu>
          {deckImageUrl === null ? (
            <Styled.DeckImg deckImg={teststudent} alt="Deck Logo" />
          ) : (
            <Styled.DeckImg deckImg={deckImageUrl} />
          )}
          <Styled.Title>Card Listing for {deckName}</Styled.Title>
          <Styled.Description>{description}</Styled.Description>
          <Styled.DeckCards>
            <Styled.CardCount>
              <Styled.CardCountButton>{cards.length}</Styled.CardCountButton>{" "}
              Cards
            </Styled.CardCount>
            {authorizedRole && (
              <Button id="addcard" type="button" onClick={toggleOnModal}>
                Add Card
              </Button>
            )}
            {authorizedRole && (
              <Styled.AddCardButton
                id="deckedit"
                type="button"
                onClick={toggleOnModal}
              >
                Edit Details
              </Styled.AddCardButton>
            )}
            <CardCreate key={cardData.deck.id} deck={cardData.deck} />
          </Styled.DeckCards>
        </Styled.Menu>
      </Styled.Header>
      {successAlert && !toggleOn && (
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
    </>
  );
};

CardList.propTypes = {
  props: PropTypes.object,
};

export default withSession(
  withAuthorization((session) => session && session.me)(withRouter(CardList))
);
