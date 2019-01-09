import React from "react";

import withSession from "../Session/withSession";

import Decks from "./Decks";

const FlashCardPage = ({ session }) => (
  <div>
    <h2>Flashcards</h2>
    <hr />

    {session && session.me && <Decks />}
  </div>
);

export default withSession(FlashCardPage);
