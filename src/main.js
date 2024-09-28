import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';

createApp(App).use(router).mount('#app')
