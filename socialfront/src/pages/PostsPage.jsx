import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/posts.css';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      setPosts(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <div className="post-header">
            <img
              src={`https://socialmediawithnode.onrender.com/${post.user.photo}`}
              alt={post.user.username}
              className="user-avatar"
            />
            <div className="post-info">
              <span className="username">{post.user.username}</span>
              <span className="timestamp">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="post-image" onClick={() => handlePostClick(post._id)}>
            <img src={`${api}/api/posts/data:image/*;base64,${post.image}`} alt={post.user.username} />
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <div className="social-actions">
            <div className="like">
              <span className="fa fa-thumbs-up"></span>
              <span>{post.likeCount}</span>
            </div>
            <div className="comment">
              <span className="fa fa-comment"></span>
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
