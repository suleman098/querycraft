import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/Router'; // Ensure this path is correct
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastifyCustom.css';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <AppRouter />
    </Router>
  );
};

export default App;
