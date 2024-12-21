import React, { useEffect, useState } from 'react';
import { getThreads } from '../services/thread';

export default function ThreadList() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const response = await getThreads();
      setThreads(response.threads);
    };

    fetchThreads();
  }, []);

  return (
    <div>
      <h3>Your Threads</h3>
      <ul>
        {threads.map((thread) => (
          <li key={thread._id}>{thread.participants.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

