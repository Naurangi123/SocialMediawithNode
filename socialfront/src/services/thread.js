
import api from './api'


const token=sessionStorage.getItem('token')

console.log("Thread token",token);


export const createThread = async (receiverId) => {
    const response = await api.post('/',{ receiverId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
};
  
export const getThreads = async () => {
    const response = await api.get('/',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};