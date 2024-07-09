import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // Ensure you import db
import './Auth.css';
import '../ToastifyCustom.css'; // Import custom Toastify CSS
import logo from '../images/logo23.png'; // Adjust the path to your logo image
import Login from './Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth-body');
    const timer = setTimeout(() => {
      document.querySelector('.form-container.signup').classList.add('show');
    }, 10);
    return () => {
      document.body.classList.remove('auth-body');
      clearTimeout(timer);
    };
  }, []);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the user's first name and last name in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      setUser(user);
      toast.success('Account created successfully!', { className: 'toastify-custom' });
    } catch (error) {
      console.error('Error signing up:', error.message);
      handleFirebaseError(error);
    }
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        toast.error('This email is already in use. Please use a different email.', { className: 'toastify-custom' });
        break;
      case 'auth/invalid-email':
        toast.error('Invalid email address. Please check and try again.', { className: 'toastify-custom' });
        break;
      case 'auth/operation-not-allowed':
        toast.error('Email/password accounts are not enabled. Please contact support.', { className: 'toastify-custom' });
        break;
      case 'auth/weak-password':
        toast.error('Password is too weak. Please choose a stronger password.', { className: 'toastify-custom' });
        break;
      default:
        toast.error('An error occurred. Please try again.', { className: 'toastify-custom' });
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer />
      {showLogin ? (
        <Login setUser={setUser} />
      ) : (
        <div className="form-container signup">
          <div className="logo-container">
            <img src={logo} alt="Logo" />
          </div>
          <button className="switch-button" onClick={() => setShowLogin(true)}>
            <i className="fas fa-exchange-alt"></i>
          </button>
          <h2 className="auth-header">Sign Up</h2>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
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
          <button onClick={handleSignup}>Sign Up</button>
          <div className="switch-link" onClick={() => setShowLogin(true)}>
            Already have an account? Login
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
