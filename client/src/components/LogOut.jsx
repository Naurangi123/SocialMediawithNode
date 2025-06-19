import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LogOut = ({ loggedInUser }) => {
  useEffect(() => {
    sessionStorage.removeItem('token');
    loggedInUser(false);
  }, [loggedInUser]);

  return <Navigate to="/login" />; 
};

export default LogOut;
