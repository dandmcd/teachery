import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import withSession from "../../../../Session/withSession";
import TagDelete from "../../DeckItem/DeckTags/TagDelete";

function SearchTagLink({ tag, deckId, session }) {
  return (
    <TagItem>
      <Row>
        <Column>
          <div>
            <Link to={`/tag/${tag.id}`}>{tag.tagName} </Link>
          </div>
        </Column>

        <Column>
          {tag.decks.length} {tag.decks.length === 1 ? "deck" : "decks"}
        </Column>
      </Row>
    </TagItem>
  );
}

SearchTagLink.propTypes = {
  tag: PropTypes.object.isRequired,
  deckId: PropTypes.string,
  session: PropTypes.object.isRequired
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TagItem = styled.h5`
  margin: 0px;
`;

export default withSession(SearchTagLink);
