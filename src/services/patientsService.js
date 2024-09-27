import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: `${API_BASE_URL}/patients`,
    headers: {
        'Content-type': 'application/json'
    }
});

export const getPatients = () => http.get("/");
export const addPatient = (patient) => http.post("/", patient);
export const updatePatient = (id, patient) => http.put(`/${id}`, patient);
export const deletePatient = (id) => http.delete(`/${id}`);
