import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as Styled from "./style";

import * as routes from "../../../../routing/routes";

const CardDeck = ({ cards }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [state, setState] = useState({
    index: 0,
    countRight: 0,
    countWrong: 0
  });
  const { index, countRight, countWrong } = state;

  const onClickIncrement = () => {
    setState({
      countRight: countRight + 1,
      countWrong: countWrong,
      index: index + 1
    });
    setIsFlipped(false);
  };

  const onClickDecrement = () => {
    setState({
      countRight: countRight,
      countWrong: countWrong + 1,
      index: index + 1
    });
    setIsFlipped(false);
  };

  const handleCardFlip = e => {
    setIsFlipped(isFlipped === false ? true : false);
  };

  //Preload card images
  let cardsWithImages = cards.filter(card => card.pictureUrl);
  const cardUrls = cardsWithImages.map(card => card.pictureUrl);
  useEffect(() => {
    cardUrls.forEach(image => {
      new Image().src = image;
    });
  }, [cardUrls]);

  const card = cards[index];

  if (index >= cards.length) {
    return (
      <Styled.Container>
        <h1>FINISHED</h1>
        <h2>Here are the results ...</h2>
        <h2>
          <Styled.FinishCorrect>{countRight}</Styled.FinishCorrect> Right and{" "}
          <Styled.FinishWrong>{countWrong}</Styled.FinishWrong> Wrong
        </h2>
        <Link to={routes.FLASHCARDS}>Go back to Flashcards page</Link>
      </Styled.Container>
    );
  } else {
    return (
      <Styled.Container>
        <Styled.Box>
          <Styled.CardFront>{card.front}</Styled.CardFront>
          {cardUrls.map(url => url) && card.pictureUrl && (
            <Styled.CardImg src={card.pictureUrl} alt={card.front} />
          )}
          {isFlipped && (
            <Fragment>
              <Styled.Hr />
              <Styled.CardBack>{card.back}</Styled.CardBack>
            </Fragment>
          )}
        </Styled.Box>
        <Styled.Footer>
          <Styled.FooterLeft>
            <Styled.CorrectButton onClick={onClickIncrement}>
              Right
            </Styled.CorrectButton>
          </Styled.FooterLeft>
          <Styled.BigButtonDiv>
            <Styled.ShowAnswer onClick={handleCardFlip}>
              {isFlipped ? "Hide Answer" : "Show Answer"}
            </Styled.ShowAnswer>
          </Styled.BigButtonDiv>
          <Styled.FooterRight>
            <Styled.WrongButton onClick={onClickDecrement}>
              Wrong
            </Styled.WrongButton>
          </Styled.FooterRight>
        </Styled.Footer>
      </Styled.Container>
    );
  }
};

CardDeck.propTypes = {
  cards: PropTypes.array.isRequired
};

export default CardDeck;
