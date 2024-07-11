import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './SideMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo23.png'; // Adjust the path to your logo image

const SideMenu = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="side-menu">
      <img src={logo} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/excel-helper">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon icon={faCog} />
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" onClick={handleLogout} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
