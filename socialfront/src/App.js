import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './AuthPage/Login';
import Register from './AuthPage/Register';
import PostsPage from './pages/PostsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatePost from './pages/CreatePost';
import PostDetailPage from './pages/PostDetailPage';
import UserProfile from './pages/UserProfile';
import LogOut from './components/LogOut';
import ProtectedRoute from './components/ProtectedRoute';
// import Message from './pages/Message';
import ThreadList from './Chat/ThreadList';
import ChatRoom from './Chat/ChatRoom';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const loggedInUser = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login loggedInUser={loggedInUser} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

        <Route path="/"
          element={
            <ProtectedRoute>
              <PostsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/createpost"
          element={
            <ProtectedRoute>
              <CreatePost loggedInUser={loggedInUser} />
            </ProtectedRoute>
          }
        />
        <Route path="/msg" element={<ThreadList />} />
        <Route path="/thread/:threadId" element={<ChatRoom />} />

        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile loggedInUser={loggedInUser} />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<LogOut loggedInUser={loggedInUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
