import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/api/auth/user');
      setUser(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (error) {
    return <div className="text-red-600 text-center mt-4">Error: {error}</div>;
  }

  if (Object.keys(user).length === 0) {
    return <div className="text-center mt-4 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full text-center">
        <div className="mb-6">
          <img
            src={`data:image/*;base64,${user.photo}`}
            alt={user.username}
            className="mx-auto w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
        <p className="text-gray-500 text-sm mb-2">{user.email}</p>
        <p className="text-gray-600 italic">
          {user.bio ? user.bio : 'No bio available'}
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate('/edit-profile')}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
