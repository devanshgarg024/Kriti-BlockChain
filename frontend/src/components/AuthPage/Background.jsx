import React from 'react';
import Logo from './logo';
import './Background.css';
import './Logo.css';

const Background = () => {
  return (
    <div className="background">
      <Logo/>
      <div className="background-text">
        <h1>Clean Energy.</h1>
        <h1>Clear Transactions.</h1>
        <h1>Better World.</h1>
      </div>
    </div>
  );
};

export default Background;
