import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import Loading from "../../../../../Loading";
import DeckItemBase from "../../../DeckItem";
import withSession from "../../../../../Session/withSession";
import ErrorMessage from "../../../../../Alerts/Error";

const TAGS_QUERY = gql`
  query TagsQuery($id: ID!) {
    tag(id: $id) {
      id
      decks {
        id
        deckName
        description
        deckImageUrl
        deckImageName
        createdAt
        user {
          id
          username
        }
        cards {
          id
          front
          back
          pictureName
          pictureUrl
        }
        tags {
          id
          tagName
        }
      }
    }
  }
`;

const DeckContainer = styled.div`
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  row-gap: 20px;
  column-gap: 5px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Tags = props => {
  console.log(props);
  let { id } = props.match.params;
  id = parseInt(id);

  const [showPopup, setShowPopup] = useState(false);

  const { data, error, loading } = useQuery(TAGS_QUERY, { variables: { id } });
  if (loading && !data) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const taggedDecksToRender = data.tag.decks;

  return (
    <DeckContainer>
      {taggedDecksToRender.map(deck => (
        <DeckItem
          key={deck.id}
          deck={deck}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      ))}
    </DeckContainer>
  );
};

const DeckItem = withSession(DeckItemBase);

export default Tags;
