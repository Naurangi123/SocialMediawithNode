import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { TOKEN } from '../../constants';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
        setError('Please fill in both fields.');
        return;
        }
        try {
            const res = await api.post('/api/auth/login', { username, password });
            const { token } = res.data;
            console.log("before set token",token);
            
            localStorage.setItem(TOKEN, token); 
            console.log("After set token",token);
            navigate('/profile');  
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="form-register">
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
                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
