import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importar el router para la ubicacion (    npm install vue-router@4 )


const app = createApp(App);
app.use(router); // Usar el router
app.mount('#app');
