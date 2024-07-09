import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.add('auth-body');
    return () => {
      document.body.classList.remove('auth-body');
    };
  }, []);

  return (
    <div className="auth-page">
      <ToastContainer />
      {showLogin ? (
        <Login setShowLogin={setShowLogin} setUser={setUser} />
      ) : (
        <Signup setShowLogin={setShowLogin} setUser={setUser} />
      )}
    </div>
  );
};

export default Auth;

