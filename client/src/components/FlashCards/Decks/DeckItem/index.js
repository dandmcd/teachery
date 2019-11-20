import React, { useState } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import TagLink from "./DeckTags/TagLink";
import { Link } from "react-router-dom";
import history from "../../../../routing/history";
import DeckDelete from "./../DeckDelete";
import * as Styled from "./style";
import Button from "../../../../theme/Button";

import teststudent from "../../../../assets/teststudent.jpg";

const DeckItemBase = ({ deck, session }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleEditDeck @client
      toggleAddTag @client
      toggleAddCard @client
    }
  `);
  const { toggleEditDeck, toggleAddTag, toggleAddCard } = data;
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

  const togglePopupModal = mutateType => {
    if (mutateType === "addTag") {
      client.writeData({
        data: {
          toggleAddTag: !toggleAddTag,
          current: deck.id
        }
      });
      console.log("Add Tag");
    } else if (mutateType === "addCard") {
      client.writeData({
        data: {
          toggleAddCard: !toggleAddCard,
          current: deck.id
        }
      });
      console.log("Add Card");
    } else {
      client.writeData({
        data: {
          toggleEditDeck: !toggleEditDeck,
          current: deck.id
        }
      });
      console.log("Else");
    }
  };
  const isInvalid = count === "" || count <= "0";

  return (
    <Styled.DeckItemContainer>
      <Styled.CardGrid>
        {deck.deckImageUrl === null ? (
          <Styled.DeckImg src={teststudent} alt="Deck Logo" />
        ) : (
          <Styled.DeckImg src={deck.deckImageUrl} alt="Deck Logo" />
        )}
        <Styled.DeckInfo>
          <Styled.Title>
            <Link to={cardListLink}>{deck.deckName.toUpperCase()}</Link>
          </Styled.Title>

          <Styled.Description>{deck.description}</Styled.Description>
        </Styled.DeckInfo>
        <Styled.CreatedItem>
          <Styled.CreatedBy>Created by: {deck.user.username}</Styled.CreatedBy>

          <Styled.CreatedOn>
            On: <Moment format="YYYY-MM-DD">{deck.createdAt}</Moment>
          </Styled.CreatedOn>
          <Styled.Tags>
            {deck.tags.map(tag => (
              <TagLink key={tag.id} tag={tag} deckId={deck.id} />
            ))}
          </Styled.Tags>
        </Styled.CreatedItem>
        <Styled.Practice>
          <Styled.PracticeText>Study Now</Styled.PracticeText>
          <Styled.PracticeInstruct>
            Enter an amount to study below or choose All to Start...
          </Styled.PracticeInstruct>
          <Styled.PracticeCardCount>
            <Link to={cardListLink}>
              <em>{deck.cards.length}</em> Cards
            </Link>
          </Styled.PracticeCardCount>

          <Styled.PracticeForm onSubmit={e => onSubmit(e)}>
            <Styled.PracticeInput
              name="count"
              value={count}
              onChange={onChange}
              type="number"
              min="1"
              max={deck.cards.length}
              step="1"
              placeholder="__"
            />
            <Styled.PracticeAll type="button" onClick={handleClick}>
              All
            </Styled.PracticeAll>
            <Styled.PracticeStart disabled={isInvalid} type="submit">
              Start
            </Styled.PracticeStart>
          </Styled.PracticeForm>
        </Styled.Practice>
        <Styled.DeckButtons>
          <EditDropDown>
            <Button type="button" onClick={togglePopupModal}>
              Edit Deck
            </Button>
            <EditDropDownContent>
              <AddCardButton type="button">Test</AddCardButton>
              <Button type="button" onClick={() => togglePopupModal("addTag")}>
                Add Tag
              </Button>
              {session && session.me && deck.user.id === session.me.id && (
                <DeckDelete deck={deck} />
              )}
            </EditDropDownContent>
          </EditDropDown>
          {session && session.me && deck.user.id === session.me.id && (
            <DeckDelete deck={deck} />
          )}
          <Button type="button" disabled>
            Bookmark
          </Button>
        </Styled.DeckButtons>
      </Styled.CardGrid>
    </Styled.DeckItemContainer>
  );
};

DeckItemBase.propTypes = {
  deck: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

const EditDropDown = styled.div`
  position: relative;
  display: inline-block;
  z-index: 100;
`;

const EditDropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
  ${EditDropDown}:hover & {
    display: block;
  }
`;

const DropButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  :hover {
    background: #1ab2b2;
  }
`;

const EditButton = styled.button`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  :hover {
    background: #1ab2b2;
  }
`;

const AddCardButton = styled(Button)`
  border: 2px solid #0d5d5d;
`;

export default DeckItemBase;
