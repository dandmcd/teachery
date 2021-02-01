import React from "react";
import styled from "styled-components";

import withAuthorization from "../Session/withAuthorization";
import Decks from "./Decks";
import Search from "./Decks/DeckSearch";
import DeckCreate from "./Decks/DeckCreate";
import DeckEdit from "./Decks/DeckEdit";
import AddDeckTag from "./Decks/DeckTags/DeckTagCreate";
import CardCreate from "./Cards/CardCreate";
import DeckBookmarks from "./Decks/DeckBookmarks";
import Button from "../../theme/Button";
import { useAtom } from "jotai";
import { modalAtom } from "../../state/store";

const FlashCardPage = () => {
  const [, setModal] = useAtom(modalAtom);
  const toggleOnModal = (e) => {
    setModal(
      (m) =>
        (m = {
          ...m,
          toggleOn: true,
          target: e.target.id,
        })
    );
  };
  return (
    <Container>
      <FlashCardHeader>
        <Menu>
          <Title>Flashcard Decks</Title>
          <DeckCreate />
          <CreateButton id="deckcreate" type="button" onClick={toggleOnModal}>
            Create A New Deck
          </CreateButton>
        </Menu>
        <AddDeckTag />
        <CardCreate />
        <DeckEdit />
        <Menu>
          <Search />
          <DeckBookmarks />
        </Menu>
      </FlashCardHeader>
      <Decks limit={6} />
    </Container>
  );
};

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

const FlashCardHeader = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
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
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

const Menu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

const CreateButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.secondary};
  width: 175px;
`;

export default withAuthorization((session) => session && session.me)(
  FlashCardPage
);
