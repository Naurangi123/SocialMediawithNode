import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      setPosts(response.data);
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
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div className="flex items-center gap-3 p-4 border-b">
            <img
              src={`data:image/*;base64,${post.user.photo}`}
              alt={post.user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{post.user.username}</p>
              <p className="text-xs text-gray-500">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>

          {/* Post Image */}
          <div
            className="cursor-pointer"
            onClick={() => handlePostClick(post._id)}
          >
            <img
              src={`data:image/*;base64,${post.image}`}
              alt="Post"
              className="w-full object-cover max-h-[400px]"
            />
          </div>
          <div className="px-4 py-3 text-gray-700">
            <p>{post.content}</p>
          </div>
          <div className="flex justify-between px-4 py-2 border-t text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="fa fa-thumbs-up"></span>
              <span>{post.likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
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
