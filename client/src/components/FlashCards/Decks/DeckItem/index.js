import React, { useState } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { useQuery, useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import { cloneDeep } from "lodash";

import TagLink from "../DeckTags/DeckTagItem";
import { Link } from "react-router-dom";
import history from "../../../../routing/history";
import DeckDelete from "./../DeckDelete";
import * as Styled from "./style";
import teststudent from "../../../../assets/teststudent.jpg";
import like from "../../../../assets/like.png";
import liked from "../../../../assets/liked.png";
import { GET_ME } from "../../../Session/queries";

const BOOKMARK_DECK = gql`
  mutation($id: ID!) {
    bookmarkDeck(id: $id) {
      id
    }
  }
`;

const REMOVE_BOOKMARK = gql`
  mutation($id: ID!) {
    removeBookmark(id: $id)
  }
`;

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

  const [isChecked, setIsChecked] = useState(false);
  const [sessionCount, setSessionCount] = useState({
    count: ""
  });
  const { count } = sessionCount;

  const isBookmarked = deckId => {
    return deckId.id === deck.id;
  };

  const [bookmarkDeck] = useMutation(BOOKMARK_DECK, {
    update(cache, { data: { bookmarkDeck } }) {
      const localData = cloneDeep(
        cache.readQuery({
          query: GET_ME
        })
      );

      localData.me.bookmarkedDecks = [
        ...localData.me.bookmarkedDecks,
        bookmarkDeck
      ];
      cache.writeQuery({
        query: GET_ME,
        data: { ...localData }
      });
    }
  });
  const [removeBookmark] = useMutation(REMOVE_BOOKMARK, {
    update(cache, { data: { removeBookmark } }) {
      const localData = cloneDeep(
        cache.readQuery({
          query: GET_ME
        })
      );

      localData.me.bookmarkedDecks = localData.me.bookmarkedDecks.filter(
        item => item.id !== deck.id
      );
      cache.writeQuery({
        query: GET_ME,
        data: { ...localData }
      });
    }
  });

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

  const toggleEditMenu = () => {
    setIsChecked(isChecked === false ? true : false);
  };

  const togglePopupModal = mutateType => {
    if (mutateType === "addTag") {
      client.writeData({
        data: {
          toggleAddTag: !toggleAddTag,
          current: deck.id
        }
      });
    } else if (mutateType === "addCard") {
      client.writeData({
        data: {
          toggleAddCard: !toggleAddCard,
          current: deck.id
        }
      });
    } else {
      client.writeData({
        data: {
          toggleEditDeck: !toggleEditDeck,
          current: deck.id
        }
      });
    }
  };
  const isInvalid = count === "" || count <= "0";

  return (
    <Styled.DeckItemContainer>
      <Styled.CardGrid>
        {deck.deckImageUrl === null ? (
          <Styled.DeckImg deckImg={teststudent} alt="Deck Logo" />
        ) : (
          <Styled.DeckImg deckImg={deck.deckImageUrl} />
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
            <Styled.ManageButton
              type="checkbox"
              checked={isChecked}
              onClick={toggleEditMenu}
              onChange={toggleEditMenu}
            >
              Manage
            </Styled.ManageButton>
            <EditDropDownContent isChecked={isChecked}>
              {session.me.role === "ADMIN" ||
                (session && session.me && deck.user.id === session.me.id && (
                  <DeckDelete deck={deck} />
                ))}
              {session.me.role === "ADMIN" ||
                (session && session.me && deck.user.id === session.me.id && (
                  <Styled.EditButton type="button" onClick={togglePopupModal}>
                    Edit Details
                  </Styled.EditButton>
                ))}
              <Styled.TagButton
                type="button"
                onClick={() => togglePopupModal("addTag")}
              >
                Add Tag
              </Styled.TagButton>
            </EditDropDownContent>
          </EditDropDown>

          <BrowseLink to={cardListLink}>
            <Styled.BrowseButton type="button">Browse</Styled.BrowseButton>
          </BrowseLink>
          {session.me.bookmarkedDecks.find(isBookmarked) ? (
            <Styled.Like>
              <Styled.LikeButton
                type="button"
                onClick={() => removeBookmark({ variables: { id: deck.id } })}
              >
                <LikeIcon src={liked} />
              </Styled.LikeButton>
            </Styled.Like>
          ) : (
            <Styled.Like>
              <Styled.LikeButton
                type="button"
                onClick={() => bookmarkDeck({ variables: { id: deck.id } })}
              >
                <LikeIcon src={like} />
              </Styled.LikeButton>
            </Styled.Like>
          )}
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
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  z-index: 30;
`;

const EditDropDownContent = styled.div`
  display: ${props => (props.isChecked ? "block" : "none")};
  position: absolute;
  width: -webkit-min-content;
  width: -moz-min-content;
  width: min-content;
  background-color: ${props => props.theme.container};
  -webkit-box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 16;
  bottom: 100%;
`;

const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const BrowseLink = styled(Link)`
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  display: inherit;
`;

export default DeckItemBase;
