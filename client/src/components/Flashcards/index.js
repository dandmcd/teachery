import React from "react";
import withAuthorization from "../Session/withAuthorization";

import Decks from "./Decks";
import Search from "./Decks/DeckSearch";
import DeckCreate from "./Decks/DeckCreate";
import TagCreate from "./Decks/DeckItem/TagCreate";

const FlashCardPage = () => (
  <div>
    <h2>Flashcards</h2>
    <h3>
      <DeckCreate />
    </h3>
    <Search />
    <hr />
    <Decks limit={3} />
  </div>
);

export default withAuthorization(session => session && session.me)(
  FlashCardPage
);
