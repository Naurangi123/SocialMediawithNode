import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PostPage from "./components/PostsPage";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import "./App.css";
import UserProfile from "./components/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetailPage from "./components/PostDetailPage";


function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}


const App = () => {

  
  return (
    <Router>
      <Navbar/>
       <Routes>
       <Route path="/" element={<ProtectedRoute><PostPage /></ProtectedRoute>}/>
        <Route path="/createpost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>}/> 

        <Route path="/login" element={ <Login/>}/>
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>  
    </Router>
  );
};

export default App;
