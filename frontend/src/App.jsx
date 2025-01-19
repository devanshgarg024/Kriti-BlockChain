import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importing Routes and Route
import AuthPage from './components/AuthPage/AuthPage.jsx';
import CreateAccount from './components/AuthPage/CreateAccount.jsx';
import Verify from './components/AuthPage/Verify.jsx';
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<AuthPage />} />
      <Route exact path="/signup" element={<CreateAccount />} />
      <Route exact path="/verify" element={<Verify />} />
    </Routes>
  );
};

export default App;
