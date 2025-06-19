import React from 'react';
import { Link } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          <Link to="/">MyBlog</Link>
        </div>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/createpost" className="text-gray-700 hover:text-blue-600 transition">Create Post</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">Profile</Link>
              </li>
              {/* <li><Link to="/msg">Message</Link></li> */}
              <li>
                <button
                  className="text-red-500 hover:text-red-700 transition text-xl"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <RiLogoutCircleRLine />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
