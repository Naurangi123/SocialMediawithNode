import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css'

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/createpost">Create Post</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
