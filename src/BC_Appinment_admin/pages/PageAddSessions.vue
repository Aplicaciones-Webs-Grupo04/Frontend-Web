<script>
import SessionListComponent from '../components/SessionListComponent.vue';
import FormAddSessions from "../components/formAddSessions.vue";


export default {
  components: { SessionListComponent, FormAddSessions },
  data() {
    return {
      session: {
        appointmentDate: '',
        patient: {
          name: '',
          lastName: ''
        }
      }
    }
  }
}
</script>

<template>
  <div class="headerPage">   <h1 class="titlePage">Add New Session</h1> </div>
 <div class="FormAddSessions"><FormAddSessions :session="session" @sesion-agregada="actualizarSesiones" /></div>
 <div class="SessionListComponent"><SessionListComponent/></div>
</template>

<style>
.headerPage {
  background-color: #091133;
  color: #fff;
  padding: 1em;
  text-align: center;
}
.titlePage {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}
.FormAddSessions {
  float: right; /* Agregamos float right para que se pegue a la derecha */
  width: 40%; /* Ajustamos el ancho del formulario */
  margin: 40px 0; /* Quitamos el margin auto para que no se centre */
  padding: 20px;
  background-color: #69BFB7; /* Color de fondo del formulario */
  border: 1px solid #308C83; /* Color del borde del formulario */
  border-radius: 0.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.SessionListComponent {
  float: left; /* Agregamos float left para que se pegue a la izquierda */
  width: 60%; /* Ajustamos el ancho de la lista */
  padding: 20px;
}

.SessionListComponent ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.SessionListComponent li {
  margin: 1em;
  width: calc(33.33% - 2em);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.SessionListComponent li:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>