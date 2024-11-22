import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode }from 'jwt-decode'; 

import { TOKEN } from '../constants';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const auth = () => {
    try {
      const token = localStorage.getItem(TOKEN);
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 

      if (decodedToken.exp < currentTime) {
        setIsAuthenticated(false); 
      } else {
        setIsAuthenticated(true); 
      }
    } catch (err) {
      console.log("Error during Authentication", err.message);
      setIsAuthenticated(false); 
    }
  };

  useEffect(() => {
    auth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/register" />;
};

export default ProtectedRoute;
