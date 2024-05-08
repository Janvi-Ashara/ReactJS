import './App.css';
import React, { useEffect, useState } from 'react';

const Calculator = () => {
  const [val, setVal] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (!isNaN(key) || key === '.' || ['+', '-', '*', '/', '%'].includes(key)) {
        // If key is a number, decimal point, or operator, update val accordingly
        setVal(prevVal => prevVal + key);
      } else if (key === 'Backspace') {
        // Handle backspace to delete last character
        setVal(prevVal => prevVal.slice(0, -1));
      }
      // else if (key === 'Enter') {
      //   // Prevent default behavior of Enter key
      //   event.preventDefault();
      //   // Trigger evaluation when Enter key is pressed
      //   evaluateExpression();
      // }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      evaluateExpression();
    }
  };
  const evaluateExpression = () => {
    try {
      const evaluatedResult = eval(val);
      setVal(String(evaluatedResult));
    } catch (error) {
      setVal('Error');
    }
  };

  const backspace = () => {
    try {
      setVal(val.slice(0, -1));
    } catch (error) {
      setVal("");
    }
  };

  const handlePercentageClick = () => {
    const percentage = eval(val) / 100;
    setVal(String(percentage));
  };

  return (
    <div className="calculator">
      <input
        type="text"
        name="calc"
        placeholder="0"
        id="box"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <div>
        <button className="operator" onClick={() => setVal('')}>AC</button>
        <button className="operator" onClick={() => backspace()}>DEL</button>
        <button className="operator" onClick={() => handlePercentageClick('%')}>%</button>
        <button className="operator" onClick={() => setVal(val + '/')}>/</button>
      </div>
      <div>
        <button onClick={() => setVal(val + '7')}>7</button>
        <button onClick={() => setVal(val + '8')}>8</button>
        <button onClick={() => setVal(val + '9')}>9</button>
        <button className="operator" onClick={() => setVal(val + '*')}>*</button>
      </div>
      <div>
        <button onClick={() => setVal(val + '4')}>4</button>
        <button onClick={() => setVal(val + '5')}>5</button>
        <button onClick={() => setVal(val + '6')}>6</button>
        <button className="operator" onClick={() => setVal(val + '-')}>-</button>
      </div>
      <div>
        <button onClick={() => setVal(val + '1')}>1</button>
        <button onClick={() => setVal(val + '2')}>2</button>
        <button onClick={() => setVal(val + '3')}>3</button>
        <button className="operator" onClick={() => setVal(val + '+')}>+</button>
      </div>
      <div>
        <button onClick={() => setVal(val + '00')}>00</button>
        <button onClick={() => setVal(val + '0')}>0</button>
        <button onClick={() => setVal(val + '.')}>.</button>
        <button className="equal" onClick={() => evaluateExpression()}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
