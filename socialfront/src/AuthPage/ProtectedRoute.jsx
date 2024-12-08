import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

const ProtectedRoute = ({ user }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/auth/user', { withCredentials: true });
        console.log(response.data);
      } catch (err) {
        setError(err.response.data.message || 'Unauthorized');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <Navigate to="/" replace />;
        </div>
      ) : (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
