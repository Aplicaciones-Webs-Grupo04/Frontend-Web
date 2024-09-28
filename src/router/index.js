import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import MedicationFormsComponent from "../medication-management/pages/medication-forms.component.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: HomeComponent, meta: { title: 'Home' } },
        { path: '/about', component: AboutComponent, meta: { title: 'About us' } },
        { path: '/medication', component: MedicationFormsComponent, meta: { title: 'Medication' } },
        { path: '/', redirect: '/home' },
    ],
});


router.beforeEach((to, from, next) => {
    let baseTitle = 'PSYMED';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
export default router;