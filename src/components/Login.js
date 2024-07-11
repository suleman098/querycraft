import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './Auth.css';
import logo from '../images/logo23.png'; // Adjust the path to your logo image
import Signup from './Signup';
import { ToastContainer, toast } from 'react-toastify';


const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth-body');
    const timer = setTimeout(() => {
      document.querySelector('.form-container.login').classList.add('show');
    }, 10);
    return () => {
      document.body.classList.remove('auth-body');
      clearTimeout(timer);
    };
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success('Logged in successfully!', { className: 'toastify-custom' });
    } catch (error) {
      console.error('Error logging in:', error.message);
      handleFirebaseError(error);
    }
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        toast.error('Invalid email address. Please check and try again.', { className: 'toastify-custom' });
        break;
      case 'auth/user-disabled':
        toast.error('This account has been disabled. Please contact support.', { className: 'toastify-custom' });
        break;
      case 'auth/user-not-found':
        toast.error('No account found with this email. Please sign up.', { className: 'toastify-custom' });
        break;
      case 'auth/wrong-password':
        toast.error('Incorrect password. Please try again.', { className: 'toastify-custom' });
        break;
      default:
        toast.error('An error occurred. Please try again.', { className: 'toastify-custom' });
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer />
      {showSignup ? (
        <Signup setUser={setUser} />
      ) : (
        <div className="form-container login">
          <div className="logo-container">
            <img src={logo} alt="Logo" />
          </div>
          <button className="switch-button" onClick={() => setShowSignup(true)}>
            <i className="fas fa-exchange-alt"></i>
          </button>
          <h2 className="auth-header">Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
          <div className="switch-link" onClick={() => setShowSignup(true)}>
            Don't have an account? Sign Up
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
