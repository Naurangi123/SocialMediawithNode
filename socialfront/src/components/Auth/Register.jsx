import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(""); 
  const [profilePic, setProfilePic] = useState(null); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (profilePic && !['image/jpeg', 'image/png', 'image/gif'].includes(profilePic.type)) {
      setError("Please upload a valid image file (JPG, PNG, GIF).");
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('bio', bio);
      if (profilePic) formData.append('profilePic', profilePic); 

      const res = await api.post("/api/auth/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      console.log(res.data);

      setError(""); 
      setSuccess(true);

      setUsername("");
      setEmail("");
      setPassword("");
      setBio("");
      setProfilePic(null);

      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.msg || err.message || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-register">
        <h2>Register</h2>

        {success && <p style={{ color: 'green' }}>Registration successful! Redirecting to login...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <textarea
          name="bio"
          placeholder="Short bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="file"
          name="profilePic"
          onChange={(e) => setProfilePic(e.target.files[0])} 
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
