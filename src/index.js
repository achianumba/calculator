/*
==============
Imports
==============
 */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Screen from "./components/Screen/Screen";
import Keypad from "./components/Keypad/Keypad";
/*
===============
Calculator App
===============
 */
function Calculator() {
  //App state
  const [display, setDisplay] = useState(0);
  const [entry, setEntry] = useState(0);
  const [equalsPressed, setEqualsPressed] = useState(false); //track '=' button presses

  //Regex for validating entries
  const isNumber = /\d/;
  const isOperator = /[/x+-]/;

  //Contrary to what you might think,
  //this function is doesn't determine how
  //the evaluate() function handles the state of [display] after the '=' sign is pressed.
  //It only tracks the '=' sign and handles entries into the [entry] state after '=' is pressed
  const checkPreviousOp = () => {
    if (equalsPressed && (display === entry)) {
      setEntry(0);
      if (equalsPressed) setEqualsPressed(false);
    }
  }

  //Numeric keys handler
  const enterNumber = (number) => {
    checkPreviousOp();

    if (number === "0" && display === 0) return;
    if (String(entry).length === 15) return limitExceeded();
    
    if (number !== 0 && display === 0) {
      setDisplay(number)
      setEntry(number)
    } else {
      setDisplay(display + number);
      entry === 0 ? setEntry(number) : setEntry(entry + number);
    }
  };

  //Decimal key handler
  const enterDecimal = (key) => {
    checkPreviousOp();

    setEqualsPressed(false);
    if (String(entry).includes(key)) {
      return;
    } else {
      setDisplay(String(display) + key);
      setEntry(String(entry) + key);
    }
  };

  //Operator keys handler
  const enterOperator = (operator) => {
    checkPreviousOp();

    let temp = String(display), 
      lastIndex = temp.length - 1,
      lastChar = temp[lastIndex],
      penultimateIndex = lastIndex - 1,
      penultimate = temp[penultimateIndex];

    if (lastChar === operator) return;
    if (isOperator.test(penultimate) && isOperator.test(lastChar)) return setDisplay(display.slice(0, penultimateIndex) + operator);

    if (operator === "-") {
      if (display === 0) {
        setDisplay(operator);
        return setEntry(operator);
      }
      
      setDisplay(display + operator);

      if (entry !== 0 || entry !== '-') setEntry(0)
      return; 
    }

    if (display !== 0 && display !== "-") {
      setEntry(0);
      return isOperator.test(lastChar)
        ? setDisplay(display.slice(0, lastIndex) + operator)
        : setDisplay(display + operator);
    }
  };

  //Numeric keys handler
  const evaluate = () => {
    setEqualsPressed(true);
    if (display === 0 || display === "-") return;
    let expression = display.replace("x", "*"),
    result = String(eval(expression));

    setDisplay(result);

    setEntry(result)
  };

  //Clear entries
  const clear = () => {
    checkPreviousOp();
    setDisplay(0);
    setEntry(0);
  }

  //Backspace handle
  const backspace = () => {
    checkPreviousOp();

    if (display === 0) return;
    
    if (String(display).length === 1) {
      setDisplay(0);
      if (String(entry).length === 1) return setEntry(0);
      return;
    } else {
      setDisplay(display.slice(0, [display.length - 1]));
      return String(entry).length > 1 ? setEntry(entry.slice(0, [entry.length - 1])) : setEntry(0);
    }
  };

  const toggle = () => {
    checkPreviousOp();

    if (display === "-" || display === 0) return;
    
    if (String(display)[0] === "-") {
      setDisplay(display.slice(1))
      setEntry(entry.slice(1))
    } else {
      setDisplay("-" + display);
      setEntry("-" + entry);
    }
  };

  const limitExceeded = () => {
    let temp = display;

    setEntry('Limit Exceeded!');
    setTimeout(() => { setEntry(temp) }, 1000);
  }
  /*
  Click event handler
  */
  const handler = (e) => {
    e.preventDefault();
    if (String(entry).includes('Limit')) return;

    const id = e.target.id;
    const key = e.target.textContent;
    
    if (id === "equals") return evaluate();
    if (id === "clear") return clear();
    if (id === "cancel") return clear();
    if (id === "del") return backspace();
    if (id === "toggle") return toggle();
    if (isOperator.test(key)) return enterOperator(key);
    if (id === "decimal") return enterDecimal(key);
    if (isNumber.test(key)) return enterNumber(key);
  };

  //allow keyboard inputs
  useEffect(() => {
    //keyboard events listener/handler
    document.onkeydown = (e) => {
      e.preventDefault();
      if (String(entry).includes('Limit')) return;
      
      const key = e.key === "*" ? "x" : e.key;
      
      if (key === "Enter" || key === "=") return evaluate();
      if (key === "Delete") return clear();
      if (key === "Backspace") return backspace();
      if (isOperator.test(key)) return enterOperator(key);
      if (key === ".") return enterDecimal(key);
      if (isNumber.test(key)) return enterNumber(key);
    };
  });

  return (
    <div id="calculator">
      <p id="title">Calculator</p>
      <Screen display={display} entry={entry} />
      <Keypad handler={handler} />
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById("root"));