import React from "react";

import withSession from "../../../../../Session/withSession";
import { Link } from "react-router-dom";
import TagDelete from "../TagDelete";

function TagLink({ tag, session }) {
  console.log(session);
  return (
    <div>
      <div>
        <h5>
          <Link to={`/tag/${tag.id}`}>{tag.tagName} </Link>
          {session && session.me && session.me.role === "ADMIN" && (
            <sup>
              <TagDelete tag={tag} />
            </sup>
          )}
        </h5>
      </div>
    </div>
  );
}

export default withSession(TagLink);
