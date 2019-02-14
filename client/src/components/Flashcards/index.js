import React from "react";
import withAuthorization from "../Session/withAuthorization";

import Decks from "./Decks";
import Search from "./Decks/DeckSearch";

const FlashCardPage = () => (
  <div>
    <h2>Flashcards</h2>
    <div>
      <Search />
    </div>
    <hr />

    <Decks />
  </div>
);

export default withAuthorization(session => session && session.me)(
  FlashCardPage
);
