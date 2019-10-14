import React, { Fragment, useState, useRef } from "react";
import Moment from "react-moment";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import useOuterClickNotifier from "../../../Alerts";
import TagLink from "./DeckTags/TagLink";
import { Link } from "react-router-dom";
import history from "../../../../routing/history";
import DeckDelete from "./../DeckDelete";
import AddDeckTag from "./DeckTags/AddDeckTag";
import CardCreate from "../../Cards/CardCreate/";
import * as PopStyled from "../../../../theme/Popup";
import * as Styled from "./style";

import teststudent from "../../../../assets/teststudent.jpg";

const DeckItemBase = ({ deck, session }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      isAddTagActive @client
    }
  `);
  const { isAddTagActive } = data;
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

  const togglePopupModal = () => {
    client.writeData({
      data: { isAddCardActive: false, isAddTagActive: false }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Fragment>
      {isAddTagActive ? (
        <PopStyled.PopupGridContainer>
          <PopStyled.PopupInner ref={innerRef}>
            <AddDeckTag deck={deck} />
          </PopStyled.PopupInner>
        </PopStyled.PopupGridContainer>
      ) : null}
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
            <Styled.CreatedBy>
              Created by: {deck.user.username}
            </Styled.CreatedBy>

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
            <CardCreate key={deck.id} deck={deck} />
            {session && session.me && deck.user.id === session.me.id && (
              <DeckDelete deck={deck} />
            )}
            {!isAddTagActive && (
              <Styled.AddTagButton
                type="button"
                onClick={() => {
                  client.writeData({
                    data: { isAddTagActive: !isAddTagActive }
                  });
                }}
              >
                Add Tags
              </Styled.AddTagButton>
            )}
          </Styled.DeckButtons>
        </Styled.CardGrid>
      </Styled.DeckItemContainer>
    </Fragment>
  );
};

export default DeckItemBase;
