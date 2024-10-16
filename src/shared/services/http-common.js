import axios from "axios";

const http = axios.create({
    baseURL: 'https://alurageek-api-peach.vercel.app', // Use the proxy configured in Vite
    headers: { 'Content-type': 'application/json' }
});

export default http;