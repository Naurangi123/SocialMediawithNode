import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../services/api';

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/auth/user');
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
        console.log("erro",error)
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
        console.log("erro",error)
        setLoading(false);

      }
    };
    fetchPComment();
  }, [id]);

  const handleLikeToggle = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/likes`);
      setLike(response.data.likeCount);
    } catch (error) {
      console.log("erro",error)
    }
  };

  const handleDislikeToggle = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/dislikes`);
      setDislike(response.data.dislikeCount);
    } catch (error) {
      console.log("erro",error)
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

    try {
      const response = await api.post(`/api/comments/${id}`, newCommentObj);
      setComments([response.data, ...comments]);
      setNewComment('');
      setIsModalOpen(false);
    } catch (error) {
      console.log("erro",error)
    }
  };

  const openCommentModal = () => setIsModalOpen(true);
  const closeCommentModal = () => setIsModalOpen(false);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading post...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!user) return <div className="text-red-500 text-center">User Not Found</div>;
  if (!post) return <div className="text-center text-gray-500">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4 block"
      >
        ← Back
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          <img
            src={`data:image/*;base64,${post.user.photo}`}
            alt={post.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{post.user.username}</p>
            <p className="text-xs text-gray-500">{moment(post.createdAt).fromNow()}</p>
          </div>
        </div>

        {/* Post Image */}
        <div className="cursor-pointer">
          <img
            src={`data:image/*;base64,${post.image}`}
            alt="Post"
            className="w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <p className="text-gray-800">{post.content}</p>
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-around px-4 py-2 border-t text-gray-600">
          <button onClick={handleLikeToggle} className="hover:text-blue-500 flex items-center gap-1">
            <i className="fa fa-thumbs-up" /> {like}
          </button>
          <button onClick={handleDislikeToggle} className="hover:text-red-500 flex items-center gap-1">
            <i className="fa fa-thumbs-down" /> {dislike}
          </button>
          <button onClick={openCommentModal} className="hover:text-green-500 flex items-center gap-1">
            <i className="fa fa-comment" /> {comments.length}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add a Comment</h2>
              <button onClick={closeCommentModal} className="text-gray-600 text-xl">&times;</button>
            </div>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Comments */}
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Comments</h3>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm flex gap-3"
          >
            <img
              src={`data:image/jpeg;base64,${comment.user.photo}`}
              alt={comment.user.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{comment.user.username}</p>
              <p className="text-sm text-gray-700">{comment.content}</p>
              <p className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetailPage;
