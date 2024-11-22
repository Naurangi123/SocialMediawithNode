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
      console.log(response.data);
      
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
    // posts.map((post) => (
    //   <p>{post.title}</p>
    // ))
    <div className="post-container">
      {posts.map((post) => (
        <div key={post._id} className="post" onClick={() => handlePostClick(post._id)}>
          <div className="username-container img">
            <img
              className="user-image"
              src={`http://localhost:8000/uploads/${post.user.profilePic}`}
              alt={post.user.username}
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
              <span>👍{post.likeCount}</span>
            </p>
            <p>
              <span>👎{post.dislikeCount}</span>
            </p>
              <p>💬: {post.comments.length}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;

