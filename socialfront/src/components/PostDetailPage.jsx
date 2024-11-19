import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

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
      const response = await axios.post(`/api/posts/${id}/likes`,{userId:post.user._id});  // Replace 'userId' with actual user ID
      setPost(response.data);  // Update post with new like/dislike status
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislikeToggle = async () => {
    try {
      const response = await axios.post(`/api/posts/${id}/dislikes`,{userId:post.user._id});  // Replace 'userId' with actual user ID
      setPost(response.data);  // Update post with new like/dislike status
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  if (loading) return <div>Loading post...</div>;

  if (!post) return <div>Post not found</div>;

  const isLiked = post.likes.includes(post.user._id);  // Replace with actual user ID logic
  const isDisliked = post.dislikes.includes(post.user._id);  // Replace with actual user ID logic

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back to Posts</button>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.user.username}</p>

      <div className="likes-dislikes">
        <button onClick={handleLikeToggle} style={{ color: isLiked ? 'blue' : 'gray' }}>
          👍 {post.likeCount}
        </button>

        <button onClick={handleDislikeToggle} style={{ color: isDisliked ? 'red' : 'gray' }}>
          👎 {post.dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default PostDetailPage;
