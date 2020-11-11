import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import withSession from "../../../Session/withSession";
import DeckItemBase from "../DeckItem";

const DeckList = ({ decks, me }) => {
  return (
    <DeckContainer>
      {decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} me={me} />
      ))}
    </DeckContainer>
  );
};

DeckList.propTypes = {
  decks: PropTypes.array.isRequired,
  me: PropTypes.object,
};

const DeckContainer = styled.div`
  @supports (display: grid) {
    display: -ms-grid;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    row-gap: 20px;
    -webkit-column-gap: 5px;
    -moz-column-gap: 5px;
    column-gap: 5px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-items: center;
  }

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-line-pack: distribute;
  align-content: space-around;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 1em auto 1em auto;
`;

const DeckItem = withSession(DeckItemBase);

export default DeckList;
