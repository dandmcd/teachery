import React from "react";

import { Link } from "react-router-dom";
import TagDelete from "../TagDelete";

export default function TagLink({ tag }) {
  console.log(tag.tagName);
  return (
    <div>
      <div>
        <h5>
          <Link to={`/tag/${tag.id}`}>{tag.tagName} </Link>
          <sup>
            <TagDelete tag={tag} />
          </sup>
        </h5>
      </div>
    </div>
  );
}
