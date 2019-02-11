import React from "react";

import withAuthorization from "../Session/withAuthorization";

import Decks from "./Decks";

const FlashCardPage = () => (
  <div>
    <h2>Flashcards</h2>
    <h3>Search: </h3>
    <hr />

    <Decks />
  </div>
);

export default withAuthorization(session => session && session.me)(
  FlashCardPage
);
