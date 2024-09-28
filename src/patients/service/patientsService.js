// services/patientsService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getPatients = async () => {
    try {
        const response = await axios.get(`${API_URL}/patients`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};

export const getPatientById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/patients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient:', error);
        throw error;
    }
};
