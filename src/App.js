import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const calcBmi = (event) => {
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || weightNum <= 0 || !heightNum || heightNum <= 0) {
      alert('Please enter valid, positive numbers for weight and height');
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You are a healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };

  return (
    <div className="app">
      <div className="container">
        {/* Logo */}
        <img
          src={`${process.env.PUBLIC_URL}/bmi-logo.png`}
          alt="BMI Calculator Logo"
          className="logo"
        />
        <h2 className="center">BMI Calculator</h2>

        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              step="any"  // <-- allows decimals like 50.5
              min="1"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (cm)</label>
            <input
              type="number"
              step="any"  // <-- allows decimals like 170.2
              min="1"
              placeholder="Enter height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">Submit</button>
            <button className="btn btn-outline" type="button" onClick={resetForm}>Reset</button>
          </div>
        </form>

        <div className="center">
          {bmi && (
            <>
              <h3>Your BMI is: {bmi}</h3>
              <p>{message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
