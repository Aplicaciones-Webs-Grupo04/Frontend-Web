import axios from "axios";

const http = axios.create({
    baseURL: '/api', // Use the proxy configured in Vite
    headers: { 'Content-type': 'application/json' }
});

export default http;