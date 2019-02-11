import React, { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import TagItem from "./TagItem";

export default function DeckItem({
  deck: { id, deckname, description, createdAt, tags }
}) {
  console.log(deckname);
  return (
    <div>
      <div>
        <h2>
          <Link to={`/deck/${id}`}>{deckname}</Link>
        </h2>
        <p>{description}</p>
        <h5>
          Created on <Moment format="YYYY-MM-DD HH:mm">{createdAt}</Moment>
          <p>
            {tags.map(tag => (
              <TagItem key={tags.id} tag={tag} />
            ))}
          </p>
        </h5>
      </div>
    </div>
  );
}
