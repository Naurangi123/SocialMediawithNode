import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }
      setToken(token); 

      try {
        const response = await api.get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      }
    };

    fetchUserProfile();
  }, []); 

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      setError('Title, content, and image are required.');
      return;
    }

    if (!user) {
      setError('You need to be logged in to create a post.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('user', user.id);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await api.post('/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Post created successfully:', response.data);
      setTitle('');
      setContent('');
      setImage(null);
      setError(null);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data.message || 'Something went wrong.');
      console.error('Error creating post:', err);
    }
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          placeholder="Enter post title"
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          required
          placeholder="Write your content here"
        />

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
