import axios from 'axios';

const api = axios.create({
  baseURL: 'https://socialmediawithnode.onrender.com',
});


export default api;
