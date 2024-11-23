// import React, { useState, useEffect } from 'react';
// import {useNavigate} from 'react-router-dom'
// import axios from 'axios';

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null); 
//   const [token, setToken] = useState(localStorage.getItem('token')); 

//   const navigate=useNavigate()

//   useEffect(() => {
//     if (!token) {
//       setError('You need to log in to create a post.');
//       return;
//     }
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/auth/users', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setUser(response.data); 
//       } catch (err) {
//         if (err.response && err.response.status === 401) {
//           setError('Invalid or expired token. Please log in again.');
//           localStorage.removeItem('token');
//         } else {
//           setError('Failed to fetch user profile.');
//         }
//       }
//     };

//     fetchUser();
//   }, [token]);

//   const handleTitleChange = (e) => setTitle(e.target.value);
//   const handleContentChange = (e) => setContent(e.target.value);
//   const handleImageChange = (e) => setImage(e.target.files[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !content || !image) {
//       setError('Title and content are required.');
//       return;
//     }

//     if (!user) {
//       setError('You need to be logged in to create a post.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     formData.append('user', user.id); 

//     if (image) {
//       formData.append('image', image||'');
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/posts/create',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.headers.token) {
//         setToken(response.headers.token); 
//         localStorage.setItem('token', response.headers.token); 
//       }
//       setTitle('');
//       setContent('');
//       setImage(null);
//       setError(null);
//       navigate('/'); 
//     } catch (err) {
//       if (err.response) {
//         if (err.response.status === 401) {
//           setError('Invalid or expired token. Please log in again.');
//           localStorage.removeItem('token'); 
//         } else {
//           setError(err.response.data.message || 'Something went wrong.');
//         }
//       } else {
//         setError('Server error. Please try again later.');
//       }
//       console.error('Error creating post:', err);
//     }
//   };

//   if (error) {
//     return <div style={{ color: 'red' }}>{error}</div>;
//   }

//   return (
//     <>
//     <h2>Create a New Post</h2>
//     {error && <p style={{ color: 'red' }}>{error}</p>}
//     <form onSubmit={handleSubmit}>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={handleTitleChange}
//           required
//           placeholder="Enter post title"
//         />
//         <label htmlFor="content">Content:</label>
//         <textarea
//           id="content"
//           value={content}
//           onChange={handleContentChange}
//           required
//           placeholder="Write your content here"
//         />

//         <label htmlFor="image">Image:</label>
//         <input
//           type="file"
//           id="image"
//           inputProps={{ accept: 'image/*' }} 
//           onChange={handleImageChange}
//         />
//       <button type="submit">Create Post</button>
//     </form>
//     </>
//   );
// };

// export default CreatePost;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../components/ProtectedRoute'; // Import AuthContext

const CreatePost = () => {
  const { token, setToken } = useContext(AuthContext); // Get token and setToken from context
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError('You need to log in to create a post.');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Invalid or expired token. Please log in again.');
          localStorage.removeItem('token'); // Remove invalid token from localStorage
          setToken(null); // Clear token from context
        } else {
          setError('Failed to fetch user profile.');
        }
      }
    };

    fetchUser();
  }, [token, setToken]);

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
      const response = await axios.post(
        'http://localhost:8000/api/posts/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.headers.token) {
        setToken(response.headers.token); // Update token in context
        localStorage.setItem('token', response.headers.token); // Update token in localStorage
      }

      // Reset form and error state
      setTitle('');
      setContent('');
      setImage(null);
      setError(null);
      navigate('/'); // Redirect to home or desired page after creating the post
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid or expired token. Please log in again.');
          localStorage.removeItem('token');
          setToken(null); // Clear token from context
        } else {
          setError(err.response.data.message || 'Something went wrong.');
        }
      } else {
        setError('Server error. Please try again later.');
      }
      console.error('Error creating post:', err);
    }
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <>
      <h2>Create a New Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
