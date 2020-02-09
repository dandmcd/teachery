import React from "react";
import styled from "styled-components";

import withAuthorization from "../Session/withAuthorization";
import Decks from "./Decks";
import Search from "./Decks/DeckSearch";
import DeckCreate from "./Decks/DeckCreate";
import DeckEdit from "./Decks/DeckEdit";
import AddDeckTag from "./Decks/DeckItem/DeckTags/AddDeckTag";
import CardCreate from "./Cards/CardCreate";
import ToggleBookmarkedDecks from "./Decks/DeckBookmarks";

const FlashCardPage = () => (
  <Container>
    <FlashCardHeader>
      <Menu>
        <Title>Flashcard Decks</Title>
        <DeckCreate />
      </Menu>
      <AddDeckTag />
      <CardCreate />
      <DeckEdit />
      <Menu>
        <Search />
        <ToggleBookmarkedDecks />
      </Menu>
    </FlashCardHeader>
    <Decks limit={6} />
  </Container>
);

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

const FlashCardHeader = styled.div`
  background-color: ${props => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0.2em 0px 0.2em 12px;
  @media only screen and (max-width: 675px) {
    text-align: center;
    align-self: flex-end;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export default withAuthorization(session => session && session.me)(
  FlashCardPage
);
