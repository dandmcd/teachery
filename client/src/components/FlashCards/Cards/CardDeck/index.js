import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Styled from "./style";

const CardDeck = props => {
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
  console.log(props);

  //Preload card images
  let cardsWithImages = props.cards.filter(card => card.pictureUrl);
  const cardUrls = cardsWithImages.map(card => card.pictureUrl);
  useEffect(() => {
    cardUrls.forEach(image => {
      new Image().src = image;
    });
  }, [cardUrls]);

  const item = props.cards[index];
  if (index >= props.cards.length) {
    return (
      <Styled.Container>
        <h1>FINISHED</h1>
        <h2>Here are the results ...</h2>
        <h2>
          <Styled.FinishCorrect>{countRight}</Styled.FinishCorrect> Right and{" "}
          <Styled.FinishWrong>{countWrong}</Styled.FinishWrong> Wrong
        </h2>
        <Link to="/deck">Go back to Flashcards page</Link>
      </Styled.Container>
    );
  } else {
    return (
      <Styled.Container>
        <Styled.Box>
          <Styled.CardFront>{item.front}</Styled.CardFront>
          {cardUrls.map(url => url) && item.pictureUrl && (
            <Styled.CardImg src={item.pictureUrl} alt={item.front} />
          )}
          {isFlipped && (
            <Fragment>
              <Styled.Hr />
              <Styled.CardBack>{item.back}</Styled.CardBack>
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

export default CardDeck;
