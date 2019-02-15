import React from "react";

import { Link } from "react-router-dom";

export default function TagLink({ tag: { id, tagName } }) {
  console.log(tagName);
  return (
    <div>
      <div>
        <h5>
          <Link to={`/tag/${id}`}>{tagName}</Link>
        </h5>
      </div>
    </div>
  );
}
