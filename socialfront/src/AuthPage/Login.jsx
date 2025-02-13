import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';

const Login = ({ loggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    setError(null);    // Clear previous errors

    try {
      const response = await api.post('/api/auth/login', { username, password });
      const { token } = response.data;
      sessionStorage.setItem('token', token);
      loggedInUser(true);  // Update the logged-in status
      navigate('/');  // Navigate to home
    } catch (error) {
      setError(`Login failed: ${error.message}`);  // Set error message
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button disabled={loading} className='login_btn' type="submit">
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Looks like you don't have an account yet. Please{' '}
        <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
