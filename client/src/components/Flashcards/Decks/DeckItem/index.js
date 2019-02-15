import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import TagLink from "../DeckItem/TagLink";

export default function DeckItem({
  deck: { id, deckName, description, createdAt, tags }
}) {
  console.log(tags);
  return (
    <div>
      <div>
        <h2>
          <Link to={`/deck/${id}`}>{deckName}</Link>
        </h2>
        <p>{description}</p>
        <h5>
          Created on <Moment format="YYYY-MM-DD HH:mm">{createdAt}</Moment>
        </h5>
        <h5>
          {tags.map(tag => (
            <TagLink key={tag.id} tag={tag} />
          ))}
        </h5>
      </div>
    </div>
  );
}
