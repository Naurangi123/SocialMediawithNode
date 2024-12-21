import api from './api'

const token =sessionStorage.getItem('token')

export const sendMessage = async (threadId, content) => {
  const response = await api.post({ threadId, content }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMessages = async (threadId) => {
  const response = await api.get(`/api/threads/${threadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.messages;
};
