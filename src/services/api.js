import axios from "axios";

//create the instance

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 15000, //ms
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;