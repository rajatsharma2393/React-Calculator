import React, { Component } from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.handleClick(this.props.value);
  };

  render() {
    return (
      <button className={this.props.className} onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}

export default Button;
