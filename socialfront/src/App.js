import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostPage from "./components/PostsPage";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetailPage from "./components/PostDetailPage";


function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function App() {
  return (
      <Router>
        <Navbar/>
          <Routes>
            <Route 
            path="/" 
            element={<ProtectedRoute><PostPage /></ProtectedRoute>} 
          />
            <Route path="/createpost" element={<CreatePost />}/>
           <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/post/:id" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>}/> 
            <Route path="/logout" element={<Logout />} />
          </Routes>
      </Router>
  );
}

export default App;
