
import User from '../models/User';
import http from "../../shared/services/http-common.js";

const API_URL = '/accounts'; // Asegúrate de que esta sea la ruta correcta

export default class LoginService {
    static async login(userName, password) {
        try {
            const response = await http().post(API_URL, { userName, password });

            // Crear una instancia de User con la información recibida
            const { id, userName: name, role } = response.data; // Asegúrate de que la estructura de datos sea correcta
            return new User(id, name, password, role);
        } catch (error) {
            // Manejar errores de Axios
            if (error.response) {
                throw new Error(error.response.data.error || 'Credenciales incorrectas');
            } else {
                throw new Error('Error de conexión. Inténtalo de nuevo más tarde.');
            }
        }
    }
}