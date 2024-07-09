import React, { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Settings.css'; // Import the CSS file
import '../ToastifyCustom.css'; // Import custom Toastify CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons'; // Import the save icon
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = ({ user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    document.body.classList.add('settings-body');

    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
        }
      }
    };

    fetchUserData();

    return () => {
      document.body.classList.remove('settings-body');
    };
  }, [user]);

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`
      });

      await updateDoc(doc(db, 'users', user.uid), {
        firstName: firstName,
        lastName: lastName,
      });

      toast.success('Profile updated successfully', { className: 'toastify-custom' });
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast.error('Error updating profile. Please try again.', { className: 'toastify-custom' });
    }
  };

  return (
    <div className="settings-wrapper">
      <ToastContainer />
      <div className="settingsform-container">
        <h2 className="auth-header">Settings</h2>
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
          placeholder="Email"
          disabled
        />
        <button onClick={handleUpdate}>
          <FontAwesomeIcon icon={faSave} />
          Update
        </button>
      </div>
    </div>
  );
};

export default Settings;
