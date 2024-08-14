import React, { useState, useEffect } from 'react';
import './Calculator.css';
import Navbar from './Navbar';
const Calculator = () => {
  const [display, setDisplay] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
    } else {
      setDisplay(display + value);
    }
  };

  const handleKeyDown = (e) => {
    const validKeys = '0123456789/*-+.=';
    if (validKeys.includes(e.key)) {
      handleClick(e.key);
    } else if (e.key === 'Enter') {
      handleClick('=');
    } else if (e.key === 'Escape') {
      handleClick('C');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display]);

  return (
    <div className="calculator-container">
       <Navbar/>
      <h1>Calculator</h1>
      <div className="calculator-display">{display}</div>
      <div className="calculator-keys">
        {['7', '8', '9', '/'].map((value) => (
          <button key={value} onClick={() => handleClick(value)}>
            {value}
          </button>
        ))}
        {['4', '5', '6', '*'].map((value) => (
          <button key={value} onClick={() => handleClick(value)}>
            {value}
          </button>
        ))}
        {['1', '2', '3', '-'].map((value) => (
          <button key={value} onClick={() => handleClick(value)}>
            {value}
          </button>
        ))}
        {['0', '.', '=', '+'].map((value) => (
          <button key={value} onClick={() => handleClick(value)}>
            {value}
          </button>
        ))}
        <button className="clear" onClick={() => handleClick('C')}>
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
