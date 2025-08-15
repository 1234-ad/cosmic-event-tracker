import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading cosmic events...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="orbit">
          <div className="planet"></div>
        </div>
        <div className="orbit orbit-2">
          <div className="planet planet-2"></div>
        </div>
        <div className="orbit orbit-3">
          <div className="planet planet-3"></div>
        </div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;