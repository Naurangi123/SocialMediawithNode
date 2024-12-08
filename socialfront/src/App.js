import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './AuthPage/Login';
import Register from './AuthPage/Register';
import ProtectedRoute from './AuthPage/ProtectedRoute';
import PostsPage from './pages/PostsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatePost from './pages/CreatePost';
import PostDetailPage from './pages/PostDetailPage';
import UserProfile from './pages/UserProfile';

function LogOut() {
  sessionStorage.removeItem('token'); 
  window.location.href = '/login';  
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar user={user} />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/createpost"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PostDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* LogOut route */}
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
