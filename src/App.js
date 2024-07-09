import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/Router'; // Ensure this path is correct
import './App.css';
const App = () => {
  return (
    <Router>
      <AppRouter />
    </Router>

  );
};

export default App;
