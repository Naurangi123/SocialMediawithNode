import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ loggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', { username, password });
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      loggedInUser(true); 
      navigate('/'); 
    } catch (error) {
      setError('Invalid credentials');
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
        
        <button type="submit">Login</button>

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
