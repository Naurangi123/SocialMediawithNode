import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/profile.css'

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);


  const UserProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        Navigate('/login');
        return;
      }
      const response = await api.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log(response.data);
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
      <h2>Profile</h2>
      <div className="profile-header">
        <img src={`data:image/*;base64,${user.photo}`} alt={user.username} className="profile-img" />
        <div className="profile-info">
          <h3 className="profile-username">{user.username}</h3>
          <h4 className="profile-email">{user.email}</h4>
          <p className="profile-bio">{user.bio || 'No bio available'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
