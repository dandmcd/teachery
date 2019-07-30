import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class CardDeck extends Component {
  constructor(props) {
    super(props);

    this.handleCardFlip = this.handleCardFlip.bind(this);
    this.onClickIncrement = this.onClickIncrement.bind(this);
    this.onClickDecrement = this.onClickDecrement.bind(this);

    this.state = {
      index: 0,
      countRight: 0,
      countWrong: 0,
      isFlipped: false
    };
  }

  onClickIncrement = () => {
    this.setState({
      countRight: this.state.countRight + 1,
      index: this.state.index + 1,
      isFlipped: false
    });
    console.log(this.state.countRight + " " + this.state.countWrong);
  };

  onClickDecrement = () => {
    this.setState({
      countWrong: this.state.countWrong + 1,
      index: this.state.index + 1,
      isFlipped: false
    });
    console.log(this.state.countRight + " " + this.state.countWrong);
  };

  onGoToNext = () =>
    this.setState({ index: this.state.index + 1, isFlipped: false });

  handleCardFlip() {
    this.setState(this.toggleCardSide);
  }

  toggleCardSide(state) {
    return {
      isFlipped: !state.isFlipped
    };
  }

  render() {
    const item = this.props.cards[this.state.index];

    if (this.state.index >= this.props.cards.length) {
      return (
        <div>
          <h1>Finished</h1>
          <h2>
            {this.state.countRight} Right and {this.state.countWrong} Wrong
          </h2>
          <Link to="/deck">Go back to Flashcards page</Link>
        </div>
      );
    } else {
      return (
        <Fragment>
          <div>
            <h1>{item.front}</h1>
            {this.state.isFlipped && <h1>{item.back}</h1>}
            <hr />
            <button onClick={this.handleCardFlip}>
              {this.state.isFlipped ? "Hide Answer" : "Show Answer"}
            </button>
          </div>
          <button onClick={this.onClickIncrement}>Right</button>
          <button onClick={this.onClickDecrement}>Wrong</button>
        </Fragment>
      );
    }
  }
}
