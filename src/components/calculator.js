import React, { Component } from "react";
import Button from "./button";
import "../styles/calculator.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: 0,
      previousVal: 0,
      currentOperator: ""
    };

    this.upperRowLabels = ["AC", "+/-", "%"];
    this.operands = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];
    this.operators = ["/", "X", "+", "-", "="];
    this.lowerRowLabels = ["0", "."];
  }

  isOperand = val => {
    return this.operands.indexOf(val) !== -1;
  };

  isOperator = val => {
    return this.operators.indexOf(val) !== -1;
  };

  isUpperRowLabels = val => {
    return this.upperRowLabels.indexOf(val) !== -1;
  };

  performCalculation = (operator, val1, val2) => {
    let finalVal = 0;
    switch (operator) {
      case "+":
        finalVal = val1 + val2;
        break;
      case "-":
        finalVal = val1 - val2;
        break;
      case "X":
        finalVal = val1 * val2;
        break;
      case "/":
        finalVal = val1 / val2;
        break;
      case "%":
        finalVal = val2 / 100;
        break;
    }
    return finalVal;
  };

  handleClick = val => {
    if (this.isOperand(val) || val === "0") {
      const currentNumber = this.state.currentVal;
      if (this.state.currentOperator) {
        this.setState({
          previousVal: this.state.currentVal,
          currentVal: Number(val)
        });
      } else {
        this.setState({
          currentVal: currentNumber * 10 + Number(val)
        });
      }
    } else if (this.isOperator(val)) {
      let newValue = 0;
      if (val === "=") {
        let val1 = this.state.previousVal;
        let val2 = this.state.currentVal;
        newValue = this.performCalculation(
          this.state.currentOperator,
          val1,
          val2
        );
        console.log(newValue);
        console.log(val1);
        console.log(val2);
      } else {
        this.setState({
          currentOperator: val
        });
        newValue = this.state.currentVal;
      }
      this.setState({
        previousVal: this.state.currentVal,
        currentVal: newValue
      });
    } else if (this.isUpperRowLabels(val) && val === "AC") {
      this.setState({
        currentVal: 0,
        previousVal: 0,
        currentOperator: ""
      });
    }
  };

  render() {
    let upperRowButtons = this.upperRowLabels.map(label => (
      <Button
        key={label}
        className={"upper-row"}
        value={label}
        handleClick={this.handleClick}
      />
    ));
    let operandsButtons = this.operands.map(label => (
      <Button
        key={label}
        className={"operands"}
        value={label}
        handleClick={this.handleClick}
      />
    ));
    let operatorsButtons = this.operators.map(label => (
      <Button
        key={label}
        className={"operators"}
        value={label}
        handleClick={this.handleClick}
      />
    ));
    let lowerRowButtons = this.lowerRowLabels.map(label => (
      <Button
        key={label}
        className={"operands"}
        value={label}
        handleClick={this.handleClick}
      />
    ));
    return (
      <div className={"main-div"}>
        <div className={"main-input"}>{this.state.currentVal}</div>
        <div className={"calculator-operations"}>
          <div className={"container-left"}>
            {upperRowButtons}
            {operandsButtons}
          </div>
          <div className={"container-right"}>{operatorsButtons}</div>
          <div className={"lower-row"}>{lowerRowButtons}</div>
        </div>
      </div>
    );
  }
}

export default Calculator;
