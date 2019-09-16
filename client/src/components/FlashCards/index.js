import React from "react";
import withAuthorization from "../Session/withAuthorization";
import styled from "styled-components";

import Decks from "./Decks";
import Search from "./Decks/DeckSearch";
import DeckCreate from "./Decks/DeckCreate";

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

const FlashCardHeader = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlashCardPage = () => (
  <Container>
    <FlashCardHeader>
      <h4>Flashcard Decks</h4>
      <Menu>
        <Search />
        <DeckCreate />
      </Menu>
    </FlashCardHeader>
    <Decks limit={3} />
  </Container>
);
export default withAuthorization(session => session && session.me)(
  FlashCardPage
);
