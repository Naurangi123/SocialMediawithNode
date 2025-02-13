import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../services/api';
import '../styles/post.css';


const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedToken = sessionStorage.getItem('token');
      if (!storedToken) {
        setError('No authentication token found');
        navigate('/login')
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
        setLike(response.data.likeCount);
        setDislike(response.data.dislikeCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchPComment = async () => {
      try {
        const response = await api.get(`/api/comments/${id}/`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    fetchPComment();
  }, [id]);

  const handleLikeToggle = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/likes`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLike(response.data.likeCount);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislikeToggle = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/dislikes`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDislike(response.data.dislikeCount);
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const newCommentObj = {
      content: newComment,
      postId: id,
      user: user._id,
    };
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    setIsModalOpen(false);

    try {
      const response = await api.post(`/api/comments/${id}`, newCommentObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments([response.data, ...comments]);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const openCommentModal = () => setIsModalOpen(true);
  const closeCommentModal = () => setIsModalOpen(false);

  if (!user) return <div>User Not Found</div>;

  if (loading) return <div>Loading post...</div>;

  if (!post) return <div>Post not found</div>;

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="back_button">
        <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      </div>
      <div className="post-detail-container">
        <div className="post_header" onClick={() => navigate('/profile')}>
          <img src={`http://localhost:8000/uploads/${post.user.photo}`} alt={post.user.username} className="user-avatar" />
          <span className="username">{post.user.username}</span>
          <span className="timestamp">{moment(post.createdAt).fromNow()}</span>
        </div>
        <div className="post_image">
          <img src={`http://localhost:8000/uploads/${post.image}`} alt={post.user.username} />
        </div>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
        <div className="social_actions">
          <div className="like">
            <button onClick={handleLikeToggle} className="fa fa-thumbs-up like_btn"></button>
            {like}
          </div>
          <div className="dislike">
            <button onClick={handleDislikeToggle} className="fa fa-thumbs-down dislike_btn"></button>
            {dislike}
          </div>
          <div className="comment">
            <button className="fa fa-comment comment_btn" onClick={openCommentModal}></button>
            {comments.length ? <span>{comments.length}</span> : <span>{comments.length}</span>}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-modal" onClick={closeCommentModal}>&times;</span>
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                  required
                />
                <button type="submit" className="submit-comment-btn">Submit</button>
              </form>
            </div>
          </div>
        )}

        <div className="comment-section">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <img src={`http://localhost:8000/uploads/${comment.user.photo}`} alt={comment.user.username} className="user-avatar" />
              <p>{comment.user.username} | {comment.content}</p>
              <span className="timestamp">{moment(comment.createdAt).fromNow()}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
