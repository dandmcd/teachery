import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function DeckItem({ deck: { id, deckName, createdAt } }) {
  return (
    <div>
      <div>
        <h2>
          <Link to={`/deck/${id}`}>{deckName}</Link>
        </h2>
        <p>Description coming soon...</p>
        <h5>
          Created on <Moment format="YYYY-MM-DD HH:mm">{createdAt}</Moment>
        </h5>
      </div>
    </div>
  );
}
