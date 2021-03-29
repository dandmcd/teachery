import React from "react";

import withAuthorization from "../Session/withAuthorization";
import Decks from "./Decks";
import Search from "./Decks/DeckSearch";
import DeckCreate from "./Decks/DeckCreate";
import DeckEdit from "./Decks/DeckEdit";
import AddDeckTag from "./Decks/DeckTags/DeckTagCreate";
import CardCreate from "./Cards/CardCreate";
import DeckBookmarks from "./Decks/DeckBookmarks";
import * as Styled from "./style";
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
    <Styled.Container>
      <Styled.FlashCardHeader>
        <Styled.Menu>
          <Styled.Title>Flashcard Decks</Styled.Title>
          <DeckCreate />
          <Styled.CreateButton
            id="deckcreate"
            type="button"
            onClick={toggleOnModal}
          >
            Create A New Deck
          </Styled.CreateButton>
        </Styled.Menu>
        <AddDeckTag />
        <CardCreate />
        <DeckEdit />
        <Styled.Menu>
          <Search />
          <DeckBookmarks />
        </Styled.Menu>
      </Styled.FlashCardHeader>
      <Decks limit={6} />
    </Styled.Container>
  );
};

export default withAuthorization((session) => session && session.me)(
  FlashCardPage
);
