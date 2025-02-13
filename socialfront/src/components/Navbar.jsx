import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css'
import { RiLogoutCircleRLine } from "react-icons/ri";



const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/createpost">Create Post</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            {/* <li><Link to="/msg">Message</Link></li> */}
            <li>
              <button className='logout_btn' onClick={handleLogout}><RiLogoutCircleRLine/></button>
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
