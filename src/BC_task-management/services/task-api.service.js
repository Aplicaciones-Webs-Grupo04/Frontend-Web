import http from '../../shared/services/http-common.js';

const API_URL = '/task';

export const getTasks = async () => {
    try {
        const response = await http.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

export const addTask = async (task) => {
    try {
        const response = await http.post(API_URL, task);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to be handled by the caller
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await http.delete(`${API_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to be handled by the caller
    }
};