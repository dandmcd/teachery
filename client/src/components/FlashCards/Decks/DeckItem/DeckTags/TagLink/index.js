import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import withSession from "../../../../../Session/withSession";
import TagDelete from "../TagDelete";

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

TagLink.propTypes = {
  tag: PropTypes.object.isRequired,
  deckId: PropTypes.string,
  session: PropTypes.object.isRequired
};

const TagItem = styled.h5`
  margin: 0px;
`;

export default withSession(TagLink);
