import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3001', // Backend API URL (Use 127.0.0.1 for better Windows compatibility)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
