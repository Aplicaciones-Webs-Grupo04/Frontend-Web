import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import MedicationFormsComponent from "../medication-management/pages/medication-forms.component.vue";
import allSessions from '../BC_Appinment_admin/pages/pageAllSessions.vue';
import addSessions from '../BC_Appinment_admin/pages/PageAddSessions.vue';
import Usermng from '../BC_user-management/pages/user-mng.component.vue';
import Taskmng from '../BC_task-management/pages/task.management.component.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/sessions', component: allSessions, meta: { title: 'Sessions' } },
        { path:'/addSession',component: addSessions, meta:{title: 'Add Session'}},
        { path: '/home', component: HomeComponent, meta: { title: 'Home' } },
        { path: '/about', component: AboutComponent, meta: { title: 'About us' } },
        { path: '/medication', component: MedicationFormsComponent, meta: { title: 'Medication' } },
        { path: '/profile', component: Usermng, meta: { title: 'Profile' } },
        { path: '/task', component: Taskmng, meta: { title: 'Task' } },
        { path: '/', redirect: '/home' },
    ],
});


router.beforeEach((to, from, next) => {
    let baseTitle = 'PSYMED';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
export default router;