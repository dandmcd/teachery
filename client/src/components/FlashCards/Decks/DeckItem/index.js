import React, { useState } from "react";
import Moment from "react-moment";

import TagLink from "./DeckTags/TagLink";
import { Link } from "react-router-dom";
import history from "../../../../constants/history";
import DeckDelete from "./../DeckDelete";
import AddDeckTag from "./DeckTags/AddDeckTag";
import CardCreate from "../../Cards/CardCreate/";
import {
  DeckItemContainer,
  CardGrid,
  DeckImg,
  DeckInfo,
  Title,
  Description,
  CreatedItem,
  CreatedBy,
  CreatedOn,
  Tags,
  Practice,
  PracticeText,
  PracticeInstruct,
  PracticeCardCount,
  PracticeForm,
  PracticeInput,
  PracticeAll,
  PracticeStart,
  DeckButtons,
  AddCardButton,
  AddTagButton
} from "./style";

import teststudent from "../../../../assets/teststudent.jpg";

const DeckItemBase = ({ deck, session }) => {
  const [cardMutate, setCardMutate] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [sessionCount, setSessionCount] = useState({
    count: ""
  });
  const { count } = sessionCount;

  const onSubmit = e => {
    e.preventDefault();
    if (!count) {
      return;
    }
    history.push(`/deck/${deck.id}`, { count: count });
  };

  const cardListLink = {
    pathname: `/deck/${deck.id}/list`
  };

  const onChange = e => {
    setSessionCount({ ...sessionCount, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setSessionCount({ count: deck.cards.length });
  };

  const isInvalid = count === "" || count <= "0";

  return (
    <DeckItemContainer>
      <CardGrid>
        <DeckImg src={teststudent} alt="Deck Logo" />
        <DeckInfo>
          <Title>
            <Link to={cardListLink}>{deck.deckName.toUpperCase()}</Link>
          </Title>

          <Description>{deck.description}</Description>
        </DeckInfo>
        <CreatedItem>
          <CreatedBy>Created by: {deck.user.username}</CreatedBy>

          <CreatedOn>
            Created on <Moment format="YYYY-MM-DD">{deck.createdAt}</Moment>
          </CreatedOn>
          <Tags>
            {deck.tags.map(tag => (
              <TagLink key={tag.id} tag={tag} />
            ))}
          </Tags>
        </CreatedItem>
        <Practice>
          <PracticeText>Study Now</PracticeText>
          <PracticeInstruct>
            Enter an amount to study below or choose All to Start...
          </PracticeInstruct>
          <PracticeCardCount>
            <Link to={cardListLink}>
              <em>{deck.cards.length}</em> Cards
            </Link>
          </PracticeCardCount>

          <PracticeForm onSubmit={e => onSubmit(e)}>
            <PracticeInput
              name="count"
              value={count}
              onChange={onChange}
              type="number"
              min="1"
              max={deck.cards.length}
              step="1"
              placeholder="__"
            />
            <PracticeAll type="button" onClick={handleClick}>
              All
            </PracticeAll>
            <PracticeStart disabled={isInvalid} type="submit">
              Start
            </PracticeStart>
          </PracticeForm>
        </Practice>
        <DeckButtons>
          {!cardMutate && (
            <AddCardButton
              type="button"
              onClick={() => {
                setCardMutate(true);
              }}
            >
              Add Card
            </AddCardButton>
          )}
          {cardMutate && <CardCreate key={deck.id} deck={deck} />}

          {session && session.me && deck.user.id === session.me.id && (
            <DeckDelete deck={deck} />
          )}
          {!isOn && (
            <AddTagButton type="button" onClick={() => setIsOn(true)}>
              Add Tags
            </AddTagButton>
          )}
          {isOn && <AddDeckTag deck={deck} />}
        </DeckButtons>
      </CardGrid>
    </DeckItemContainer>
  );
};
export default DeckItemBase;
