<template>
  <div>
    <h1>Sesiones</h1>
    <ul>
      <li v-for="session in sessions" :key="session.id">
        <SessionCard :session="session" />
      </li>
    </ul>
  </div>
</template>

<script>
import SessionCard from '../components/SessionsComponent.vue';
import { obtenerSessions } from '../Service/session-api.js';
import { Session } from '../entities/Session';

export default {
  components: { SessionCard },
  data() {
    return {
      sessions: []
    }
  },
  mounted() {
    obtenerSessions()
        .then(response => {
          this.sessions = response.map(Session.fromJson);
        })
        .catch(error => {
          console.error(error);
        })
  }
}
</script>
<style>
/* Estilos generales */

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Estilos para el contenedor principal */

div {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Estilos para el título */

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

/* Estilos para la lista de sesiones */

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #f0f0f0;
}

/* Estilos para el texto de la sesión */

li span {
  font-size: 18px;
  font-weight: bold;
}

li small {
  font-size: 14px;
  color: #666;
}
</style>