import React from 'react';
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
  localStorage.removeItem('token');
  return <Login path="/login"/>
}


const App = () => {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/createpost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostDetailPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile/>
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </Router>
    <Footer />
    </>
  );
};

export default App;
