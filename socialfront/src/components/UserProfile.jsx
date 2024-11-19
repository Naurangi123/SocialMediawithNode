import React, { useState, useEffect } from 'react';
import api from '../api';  

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/auth/users');
        console.log("res",response.data,"headers",response.headers);
        setUser(response.data);  
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred.');
        }
      }
    fetchUserProfile();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <img src={`${api}/uploads/${user.profilePic}`} alt={user.username} />
      <h2>Name: {user.username}</h2>
      <h4>Email: {user.email}</h4>
      <h4>Bio: {user.bio}</h4>
    </div>
  );
};

export default UserProfile;
