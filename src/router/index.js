import { createRouter, createWebHistory } from 'vue-router';

// Importar
import HomePatients from '../components/patients/HomePatients.vue';
import PatientProfile from '../components/patients/PatientProfile.vue';
import DiagnosisPatient from '../components/patients/DiagnosisPatient.vue';
import BiologicalFunction from '../components/patients/BiologicalFunction.vue';
import MoodStatement from '../components/patients/MoodStatement.vue';
import JournalPatient from '../components/patients/JournalPatient.vue';
import PatientsView from '../views/PatientsView.vue';

// Definir las rutas
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePatients,
    },
    {
        path: '/patients',
        name: 'patientsView',
        component: PatientsView,
    },
    {
        path: '/patient-profile',
        name: 'patientProfile',
        component: PatientProfile,
    },
    {
        path: '/diagnosis',
        name: 'diagnosis',
        component: DiagnosisPatient,
    },
    {
        path: '/biological-functions',
        name: 'biologicalFunctions',
        component: BiologicalFunction,
    },
    {
        path: '/mood-statement',
        name: 'moodStatement',
        component: MoodStatement,
    },
    {
        path: '/journal-patient',
        name: 'journalPatient',
        component: JournalPatient,
    },
];

// Crear la instancia de router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
