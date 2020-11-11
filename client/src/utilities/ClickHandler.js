import React, { Component } from "react";

class ClickHandler extends Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = ({ target }) => {
    if (
      this.props.toggleOn &&
      this.wrapperRef &&
      !this.wrapperRef.contains(target)
    ) {
      this.props.closeModal();
    }
  };

  render = () => (
    <div ref={(node) => (this.wrapperRef = node)}>{this.props.children}</div>
  );
}

export default ClickHandler;
