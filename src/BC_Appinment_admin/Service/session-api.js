import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: API_BASE_URL,
});
export default http;

export const obtenerSessions = () => {
    return http.get('/sessions')
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return [];
        });
};
export const agregarSesion = (sesion) => {
    return http.post('/sessions', sesion)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return null;
        });
}
