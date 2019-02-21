import React from "react";
import withAuthorization from "../Session/withAuthorization";

import Decks from "./Decks";
import Search from "./Decks/DeckSearch";
import DeckCreate from "./Decks/DeckCreate";
import CardCreate from "./Cards/CardCreate";
import TagCreate from "./Decks/DeckItem/TagCreate";

const FlashCardPage = () => (
  <div>
    <h2>Flashcards</h2>
    <div>
      <DeckCreate />
      <hr />
      <CardCreate />
      <hr />
      <TagCreate />
      <hr />
    </div>
    <Search />
    <hr />
    <Decks limit={3} />
  </div>
);

export default withAuthorization(session => session && session.me)(
  FlashCardPage
);
