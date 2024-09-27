import { getPatients, addPatient, updatePatient, deletePatient } from "@/services/patientsService";

export const patientsModule = {
    state: () => ({
        patients: [],
    }),
    mutations: {
        SET_PATIENTS(state, patients) {
            state.patients = patients;
        },
        ADD_PATIENT(state, patient) {
            state.patients.push(patient);
        },
        UPDATE_PATIENT(state, updatedPatient) {
            const index = state.patients.findIndex(p => p.id === updatedPatient.id);
            if (index !== -1) {
                state.patients.splice(index, 1, updatedPatient);
            }
        },
        REMOVE_PATIENT(state, patientId) {
            state.patients = state.patients.filter(p => p.id !== patientId);
        },
    },
    actions: {
        async fetchPatients({ commit }) {
            const response = await getPatients();
            commit("SET_PATIENTS", response.data);
        },
        async addPatient({ commit }, patient) {
            const response = await addPatient(patient);
            commit("ADD_PATIENT", response.data);
        },
        async updatePatient({ commit }, patient) {
            const response = await updatePatient(patient.id, patient);
            commit("UPDATE_PATIENT", response.data);
        },
        async deletePatient({ commit }, patientId) {
            await deletePatient(patientId);
            commit("REMOVE_PATIENT", patientId);
        },
    },
};
