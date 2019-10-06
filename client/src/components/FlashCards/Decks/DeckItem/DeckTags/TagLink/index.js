import React from "react";

import withSession from "../../../../../Session/withSession";
import { Link } from "react-router-dom";
import TagDelete from "../TagDelete";
import styled from "styled-components";

const TagItem = styled.h5`
  margin: 0px;
`;

function TagLink({ tag, deckId, session }) {
  return (
    <TagItem>
      <Link to={`/tag/${tag.id}`}>{tag.tagName} </Link>
      {session && session.me && session.me.role === "ADMIN" && (
        <sup>
          <TagDelete tag={tag} deckId={deckId} />
        </sup>
      )}
    </TagItem>
  );
}

export default withSession(TagLink);
