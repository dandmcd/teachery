import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function DeckItem({
  deck: { id, deckname, description, createdAt }
}) {
  return (
    <div>
      <div>
        <h2>
          <Link to={`/deck/${id}`}>{deckname}</Link>
        </h2>
        <p>{description}</p>
        <h5>
          Created on <Moment format="YYYY-MM-DD HH:mm">{createdAt}</Moment>
        </h5>
      </div>
    </div>
  );
}
