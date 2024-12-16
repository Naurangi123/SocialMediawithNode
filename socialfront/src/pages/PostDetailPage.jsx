import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../services/api';
import '../styles/post.css';

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedToken = sessionStorage.getItem('token');
      if (!storedToken) {
        setError('No authentication token found');
        return;
      }
      setToken(storedToken);

      try {
        const response = await api.get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/${id}/`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLikeToggle = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/likes`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost((prevPost) => ({
        ...prevPost,
        likes: response.data.likes,
        likeCount: response.data.likeCount,
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislikeToggle = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/dislikes`, { userId: post.user._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost((prevPost) => ({
        ...prevPost,
        dislikes: response.data.dislikes,
        dislikeCount: response.data.dislikeCount,
      }));
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  if (loading) return <div>Loading post...</div>;

  if (!post) return <div>Post not found</div>;

  const isLiked = post.user._id;  
  const isDisliked = post.user._id; 

  return (
    <>
      <div className="back_button">
        <button onClick={() => navigate(-1)} className="back-btn">Back to Posts</button>
      </div>
      <div className="post-detail-container">
        <div className="post_header">
          <img src={`http://localhost:8000/uploads/${post.user.photo}`} alt={post.user.username} className="user-avatar" />
          <span className="username">{post.user.username}</span>
          <span className="timestamp">{moment(post.createdAt).format('MM/DD/YYYY, hh:mm A')}</span>
        </div>
        <div className="post_image">
          <img src={`http://localhost:8000/uploads/${post.image}`} alt={post.user.username} />
        </div>
        <div className="post-content">
          <p className="username">{post.content}</p>
        </div>
        <div className="likes-dislikes">
          <button
            onClick={handleLikeToggle}
            className={`like-btn ${isLiked ? 'liked' : ''} fa fa-thumbs-up`}
          >
          </button>
          {post.likeCount}
          <button
            onClick={handleDislikeToggle}
            className={`dislike-btn ${isDisliked ? 'disliked' : ''} fa fa-thumbs-down`}
          >
          </button>
          {post.dislikeCount}
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
