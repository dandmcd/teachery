import React, { useState } from "react";
import Moment from "react-moment";

import TagLink from "./DeckTags/TagLink";
import { Link } from "react-router-dom";
import history from "../../../../constants/history";
import DeckDelete from "./../DeckDelete";
import AddDeckTag from "./DeckTags/AddDeckTag";
import CardCreate from "../../Cards/CardCreate/";

const DeckItemBase = ({ deck, session }) => {
  const [cardMutate, setCardMutate] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [sessionCount, setSessionCount] = useState({
    count: ""
  });
  const { count } = sessionCount;

  const onSubmit = e => {
    e.preventDefault();
    if (!count) {
      return;
    }
    history.push(`/deck/${deck.id}`, { count: count });
  };

  const cardListLink = {
    pathname: `/deck/${deck.id}/list`
  };

  const onChange = e => {
    setSessionCount({ ...sessionCount, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setSessionCount({ count: deck.cards.length });
  };

  const isInvalid = count === "" || count <= "0";

  return (
    <div>
      <h2>
        <Link to={cardListLink}>{deck.deckName}</Link>
      </h2>
      <h5>
        <Link to={cardListLink}>{deck.cards.length} Cards</Link>
      </h5>
      <h4>
        How many cards to study? (Chosen at random)
        <form onSubmit={e => onSubmit(e)}>
          <input
            name="count"
            value={count}
            onChange={onChange}
            type="number"
            min="1"
            max={deck.cards.length}
            step="1"
            placeholder={deck.cards.length}
          />
          <button type="button" onClick={handleClick}>
            All
          </button>
          <button disabled={isInvalid} type="submit">
            Start
          </button>
        </form>
      </h4>

      <p>{deck.description}</p>
      <small>
        Created on <Moment format="YYYY-MM-DD HH:mm">{deck.createdAt}</Moment>
        <h5>created by: {deck.user.username}</h5>
      </small>

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
