import {createRouter, createWebHistory} from 'vue-router';
import allSessions from '../BC_Appinment_admin/pages/allSessions.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/sessions', component: allSessions, meta: { title: 'Sessions' } },
    ],
});
router.beforeEach((to, from, next) => {
    let baseTitle = 'Spymed';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
export default router;