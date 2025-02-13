import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/profile.css'

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const navigate=useNavigate()

  const UserProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
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
      <h2>Profile</h2>
      <div className="profile-header">
        <img src={`http://localhost:8000/uploads/${user.photo}`} alt={user.username} className="profile-img" />
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
