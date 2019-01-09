import React, { Component, Fragment } from "react";
import { shuffle } from "lodash";
import memoize from "memoize-one";

export default class CardDeck extends Component {
  constructor(props) {
    super(props);

    this.handleMouseHover = this.handleMouseHover.bind(this);

    this.state = {
      index: 0,
      isHovering: false
    };
  }

  shuffle = memoize(array => shuffle(array));

  onGoToNext = () => this.setState({ index: this.state.index + 1 });

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  render() {
    const shuffledCards = this.shuffle(this.props.cards);
    const item = shuffledCards[this.state.index];

    if (this.state.index >= shuffledCards.length) {
      return (
        <div>
          <h1>Finished</h1>
        </div>
      );
    } else {
      return (
        <Fragment>
          <div
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
          >
            <h1>{item.front}</h1>
          </div>
          {this.state.isHovering && (
            <div>
              <h1>{item.back}</h1>
            </div>
          )}
          <p>
            <button onClick={this.onGoToNext}>Next</button>
          </p>
        </Fragment>
      );
    }
  }
}
