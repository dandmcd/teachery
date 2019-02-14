import React from "react";

import { Link } from "react-router-dom";

export default function TagLink({ tag: { id, tagname } }) {
  console.log(tagname);
  return (
    <div>
      <div>
        <h5>
          <Link to={`/tag/${id}`}>{tagname}</Link>
        </h5>
      </div>
    </div>
  );
}
