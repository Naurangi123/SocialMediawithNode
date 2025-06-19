import React, { useEffect, useState } from 'react';
import api from '../services/api'
import moment from 'moment';
// import '../styles/register.css'
import { useNavigate } from 'react-router-dom';

export default function ThreadList() {
  const [threads, setThreads] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [token, setToken] = useState('')

  const navigate=useNavigate()

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      setToken(token)
    }
    const getThreads= async()=>{
      try{
        const response = await api.get('/api/threads/',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setThreads(response.data.threads);        
      }catch(error){
        console.error('Error in getThreads:', error);
    }
  }
    getThreads();
  },[])

  const handleCreateThread = async (e) => {
    if (!receiverId) {
      alert('Please enter a receiver ID.');
      return;
    }
    try {
      const response = await api.post('/api/threads/', { receiverId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in createThreads:', error);
      throw error;
    }
  };
  const handleThreadClick = (id) => {
    navigate(`/thread/${id}`);
  };
  return (
    <>
      <h3>Your Threads</h3>
      {threads.length > 0 ? (
        threads.map((thread, index) => (
          <div key={index} onClick={() => handleThreadClick(thread._id)}>
            <p>Created: {moment(thread.createdAt).fromNow()}</p>
            <p>Participants:</p>
            <div>
              {thread.participants.map((participant, idx) => (
                <div key={idx}>
                  Username: {participant.username}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No Threads Yet</p>
      )}
      <div className="login">
      <form onSubmit={handleCreateThread}>
        <label htmlFor="receiverId">Enter Receiver's ID:</label>
        <input
          type="text"
          id="receiverId"
          name="receiverId"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
        <button type="submit">Create Thread</button>
      </form>
      </div>
    </>
  );
};

