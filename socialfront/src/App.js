import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import PostsPage from './components/PostsPage';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import PostDetailPage from './components/PostDetailPage';

function LogOut() {
  localStorage.removeItem('token');
  return <Login path="/login"/>
}


const App = () => {
  return (
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
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </Router>
  );
};

export default App;
