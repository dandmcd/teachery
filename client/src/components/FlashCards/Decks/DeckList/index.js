import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import withSession from "../../../Session/withSession";
import DeckItemBase from "../DeckItem";

const DeckList = ({ decks, me }) => {
  console.log(decks);
  return (
    <DeckContainer>
      {decks.map(deck => (
        <DeckItem key={deck.id} deck={deck} me={me} />
      ))}
    </DeckContainer>
  );
};

DeckList.propTypes = {
  decks: PropTypes.array.isRequired,
  me: PropTypes.object
};

const DeckContainer = styled.div`
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  row-gap: 20px;
  column-gap: 5px;
  align-items: center;
  justify-items: center;
  margin-bottom: 20px;
`;

const DeckItem = withSession(DeckItemBase);

export default DeckList;
