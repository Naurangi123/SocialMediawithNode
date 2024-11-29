import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data); 
      console.log(response.data); 
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log('User state updated:', user);
  }, [user]);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="profile">
    <h2>User Profile</h2>
    {user.profilePic ? (
      <img src={`${api}/uploads/${user.profilePic}`} alt={user.username} />
    ) : (
      <img src="/default-avatar.png" alt="Default Avatar" />
    )}
    <h2>Name: {user.username}</h2>
    <h4>Email: {user.email}</h4>
    <h4>Bio: {user.bio || 'No bio available'}</h4>
  </div>
  );
};

export default UserProfile;
