import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post._id} className="post" onClick={() => handlePostClick(post._id)}>
          <div className="post_header">
            <img src={`http://localhost:8000/uploads/${post.user.photo}`} alt={post.user.username} className="user-avatar" />
            <span className="username">{post.user.username}</span>
            <span className="timestamp">{moment(post.createdAt).format('MM/DD/YYYY, hh:mm A')}</span>
          </div>
          <div className="post_image">
            <img src={`http://localhost:8000/uploads/${post.image}`} alt={post.user.username}/>
          </div>
          <div className="post-content">
            <p className="username">{post.content}</p>
            <p>{post.likeCount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;

