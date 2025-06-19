import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../../client/src/components/Navbar';
// import Footer from './components/Footer';
import ProtectedRoute from '../../client/src/components/ProtectedRoute';
import LogOut from '../../client/src/components/LogOut';

// Lazy load components
const Login = React.lazy(() => import('../../client/src/AuthPage/Login'));
const Register = React.lazy(() => import('../../client/src/AuthPage/Register'));
const PostsPage = React.lazy(() => import('../../client/src/pages/PostsPage'));
const CreatePost = React.lazy(() => import('../../client/src/pages/CreatePost'));
const PostDetailPage = React.lazy(() => import('../../client/src/pages/PostDetailPage'));
const UserProfile = React.lazy(() => import('../../client/src/pages/UserProfile'));
const ThreadList = React.lazy(() => import('../../client/src/Chat/ThreadList'));
const ChatRoom = React.lazy(() => import('../../client/src/Chat/ChatRoom'));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login loggedInUser={loggedInUser} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

          <Route path="/"
            element={
                <PostsPage />
            }
          />
          <Route path="/createpost"
            element={
              <ProtectedRoute>
                <CreatePost loggedInUser={loggedInUser} />
              </ProtectedRoute>
            }
          />
          <Route path="/msg"
            element={
              <ProtectedRoute>
                <ThreadList />
              </ProtectedRoute>
            }
          />
          <Route path="/thread/:threadId"
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
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
      </Suspense>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
