import { createRouter, createWebHistory } from 'vue-router';
import PatientsView from '../views/PatientsView.vue';
import Home from '../components/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home }, // Ruta para la página de inicio
    { path: '/patients', name: 'Patients', component: PatientsView }, // Ruta para la gestión de pacientes
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
