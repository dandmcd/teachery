import React, { Component } from "react";

//Temporarily using JSON
import flashCardsData from "./flashcardsdata";

export default class Flashcards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      finished: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    const data = flashCardsData;
    const questionList = data.map(question => <li key="index">{question}</li>);
    const randomIndex = Math.floor(Math.random() * questionList.length);
    const randomCard = questionList[randomIndex];

    if (this.state.counter >= questionList.length) {
      return (
        <div>
          <h1>Finished</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{randomCard}</h1>
          <p>
            <button onClick={this.handleClick}>Button</button>
          </p>
        </div>
      );
    }
  }
}
