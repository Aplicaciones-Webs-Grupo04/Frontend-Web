// src/BC_Appinment_admin/Service/session-api.js
import http from '../../shared/services/http-common.js';

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
};