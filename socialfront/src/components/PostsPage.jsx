import React, { useEffect, useState } from 'react';
import api from '../api';
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
    <div className="posts-container">
      {posts.length === 0 && (
        <h1 style={{ marginLeft: '30rem', alignItems: 'center' }}>No posts found.</h1>
      )}
      {posts.map((post) => (
        <div key={post._id} className="post" 
        onClick={() => handlePostClick(post._id)} 
        style={{ cursor: 'pointer', marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
          <div className="username-container">
            <img
              className="user-image"
              src={`http://localhost:8000/uploads/${post.user.profilePic}`}
              alt="profileimage"
            />
            <span>{post.user.username}</span>
          </div>
          <hr />
          <div className="post-image">
            <img
              className="post-image"
              src={`http://localhost:8000/uploads/${post.image}`}
              alt={post.title}
            />
          </div>
          <hr />
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <hr />
          <div className="like-dislike-container">
          <p>
          <span>{post.likeCount}</span>
          </p>
          <p>
          <span>{post.dislikeCount}</span>
          </p>
          <p>💬: {post.comments.length}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;

