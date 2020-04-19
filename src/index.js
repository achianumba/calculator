import React, { useState } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import Screen from './components/Screen/Screen';
import Keypad from './components/Keypad/Keypad';

export default function Calculator() {
  const [display, setDisplay] = useState(0);
  const [entry, setEntry] = useState(0);
  const [evaluated, setEvaluated] = useState(false);

  const isNumber = /\d/;
  const isOperator = /[/x+-]/;
  const endsWithOperator = /[/x+-]$/;

  const enterNumber = number => {
    return number === '0' && display === 0 ? null : number !== 0 && display === 0 ? setDisplay(number) : setDisplay(display + number);
  }

  const enterDecimal = key => {
    return String(display).includes(key) ? null : setDisplay(String(display) + key);
  }

  const cancel = key => alert('cancel pressed');

  const enterOperator = operator => {
    let temp = String(display), //In case typeof display === 'string'
    lastIndex = temp.length - 1,
    lastChar = temp[lastIndex],
    penultimateIndex = lastIndex - 1,
    penultimate = temp[penultimateIndex];

    if (
      (lastChar === operator) || 
      (isOperator.test(penultimate) && isOperator.test(lastChar))
      ) return;

    if (operator === '-') {
      if (display === 0) {
        return setDisplay(operator);
      }
      return setDisplay(display + operator);
    }

    if (display !== 0 && display !== '-') {
      return isOperator.test(lastChar) ? 
      setDisplay(display.slice(0, lastIndex) + operator) :
      setDisplay(display + operator);
    }
  }

  const evaluate = () => {
    if (display === 0 || display === '-') return;
    //3 + 5 * 6 - 2 / 4 should return 32.5
    let expression = display.replace('x', '*')
    //just in case fcc puts double decimals directly into the elem
    let doubleDecimal = /\.{2,}/g;
    expression.replace(doubleDecimal, '.');
    
    return setDisplay(eval(expression));
    return setEvaluated(true);
  }

  const clear = () => setDisplay(0);

  //Main handler
  const handler = e => {
    e.preventDefault();
    const id = e.target.id;
    const key = e.target.textContent;

    if (id === 'equals') return evaluate();
    if (id === 'clear') return clear();
    if (id === 'cancel') return cancel();
    if (isOperator.test(key)) return enterOperator(key);
    if (id === 'decimal') return enterDecimal(key);
    if (isNumber.test(key)) return enterNumber(key);
  }
  return (
    <div id="calculator">
    <p id="title">Calculator</p>
    <Screen display={ display } entry={ entry } />
    <Keypad handler={ handler } />
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById('root'));