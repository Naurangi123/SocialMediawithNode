import React, { useState } from 'react';
import { sendMessage } from '../services/message';

/* eslint-disable no-unused-vars */

export default function MessageInput({ threadId }) {
  const [content, setContent] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      try {
        const message  = await sendMessage(threadId, content);
        setContent('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="message-input-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        rows="4"
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

;
