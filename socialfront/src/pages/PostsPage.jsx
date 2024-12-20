import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    const fetchPComment = async () => {
      try {
        const response = await api.get('/api/comments/');
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    fetchPComment();
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
    <>
      <div className="posts-container">
  {posts.map((post) => (
    <div key={post._id} className="post-card" onClick={() => handlePostClick(post._id)}>
      <div className="post-header">
        <img
          src={`http://localhost:8000/uploads/${post.user.photo}`}
          alt={post.user.username}
          className="user-avatar"
        />
        <div className="post-info">
          <span className="username">{post.user.username}</span>
          <span className="timestamp">{moment(post.createdAt).format('MM/DD/YYYY, hh:mm A')}</span>
        </div>
      </div>
      <div className="post-image">
        <img src={`http://localhost:8000/uploads/${post.image}`} alt={post.user.username} />
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
          <span>{comments.length}</span>
        </div>
      </div>
    </div>
  ))}
</div>

    </>
  );
};

export default PostPage;

