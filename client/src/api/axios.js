import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Matches your backend
    withCredentials: true, // IMPORTANT: Sends HttpOnly cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;