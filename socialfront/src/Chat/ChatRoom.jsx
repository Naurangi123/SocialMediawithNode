import React, { useEffect, useState } from 'react';
import { getMessages } from '../services/message';
import MessageInput from './MessageInput'; 

export default function ChatRoom({ threadId }){
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(threadId);
      setMessages(messages);
    };
    
    fetchMessages();
  }, [threadId]);

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className="message">
            <strong>{msg.sender.username}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <MessageInput threadId={threadId} />
    </div>
  );
};

;
