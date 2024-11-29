import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/post.css'

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/${id}/`);
        console.log("data",response.data);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);
  
  // Handle like/dislike action
  const handleLikeToggle = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/likes`,{userId:post.user._id}); 
      setPost(response.data);  
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislikeToggle = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/dislikes`,{userId:post.user._id});  
      setPost(response.data);  
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  if (loading) return <div>Loading post...</div>;

  if (!post) return <div>Post not found</div>;

  const isLiked = post.likes.includes(post.user._id);  
  const isDisliked = post.dislikes.includes(post.user._id); 

  return (
      <>
        <div className="back_button">
          <button onClick={() => navigate(-1)} className="back-btn">Back to Posts</button>
        </div>
        <div className="post-detail-container">
          <div className="post_header">
            <img src={`http://localhost:8000/uploads/${post.user.photo}`} alt={post.user.username} className="user-avatar" />
            <span className="username">{post.user.username}</span>
            <span className="timestamp">{post.createdAt.toLocaleString()}</span>
          </div>
          <div className="post_image">
            <img src={`http://localhost:8000/uploads/${post.image}`} alt={post.user.username}/>
          </div>
          <div className="post-content">
            <p className="username">{post.content}</p>
          </div>
          <div className="likes-dislikes">
            <button
              onClick={handleLikeToggle}
              className={`like-btn ${isLiked ? 'liked' : ''}`} class="fa fa-thumbs-up">{post.likeCount}</button>
  
            <button
              onClick={handleDislikeToggle}
              className={`dislike-btn ${isDisliked ? 'disliked' : ''}`} class="fa fa-thumbs-down">{post.dislikeCount}
            </button>
          </div>
        </div>
      </>
  );
};

export default PostDetailPage;
