import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://157.245.173.31',
  baseURL: 'http://localhost:3800',
});

export default api;
