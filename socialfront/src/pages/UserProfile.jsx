import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const UserProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError("No authentication token found");
        return;
      }
      const response = await api.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    UserProfile();
  }, []);

  if (Object.keys(user).length === 0) {
    return <div>Loading...</div>;
  }
  


  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <img src={`http://localhost:8000/uploads/${user.photo}`} alt={user.username} width="150" />
      <h3>Name: {user.username}</h3>
      <h4>Email: {user.email}</h4>
      <h4>Bio: {user.bio || 'No bio available'}</h4>
    </div>
  );
};

export default Profile;
