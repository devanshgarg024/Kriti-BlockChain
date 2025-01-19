import React from 'react';
import Background from './Background.jsx';
import LoginForm from './LoginForm.jsx';

import './AuthPage.css';

const AuthPage = () => {
  return (
    <div className="AuthPage">
      <Background />
      <div className="login-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthPage;




