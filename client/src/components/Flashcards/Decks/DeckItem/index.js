import React, { useState } from "react";
import Moment from "react-moment";

import TagLink from "../DeckItem/TagLink";
import { Link } from "react-router-dom";
import DeckDelete from "./../DeckDelete";
import AddDeckTag from "./AddDeckTag";
import CardCreate from "../../Cards/CardCreate/";

const DeckItemBase = ({ deck, session }) => {
  const [cardMutate, setCardMutate] = useState(false);
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h2>
        <Link to={`/deck/${deck.id}`}>{deck.deckName}</Link>
      </h2>
      <p>{deck.description}</p>
      <small>
        Created on <Moment format="YYYY-MM-DD HH:mm">{deck.createdAt}</Moment>
        <h5>created by: {deck.user.username}</h5>
      </small>
      <h5>{deck.cards.length} Cards</h5>
      <h5>
        {deck.tags.map(tag => (
          <TagLink key={tag.id} tag={tag} />
        ))}
      </h5>
      {!cardMutate && (
        <button type="button" onClick={() => setCardMutate(true)}>
          Add Card
        </button>
      )}
      {cardMutate && <CardCreate key={deck.id} deck={deck} />}

      {session && session.me && deck.user.id === session.me.id && (
        <DeckDelete deck={deck} />
      )}
      {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Add Tags
        </button>
      )}
      {isOn && <AddDeckTag deck={deck} />}
    </div>
  );
};
export default DeckItemBase;
