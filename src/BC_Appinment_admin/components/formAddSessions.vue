<script>
import { agregarSesion } from '../Service/session-api.js';
import { useRouter } from 'vue-router';

const router = useRouter()
export default {
  props: {
    session: Object
  },
  methods: {
    guardarSesion() {
      agregarSesion(this.session)
          .then(() => {
            this.$emit('sesion-agregada');
            alert('Session successfully saved!');
            window.location.reload(); // Recarga la página actual
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>

<template>
  <form @submit.prevent="guardarSesion">
    <label for="appointmentDate">AppointmentDate:</label>
    <input type="date" id="appointmentDate" v-model="session.appointmentDate" required>
    <br>
    <label for="patientName">FirstName:</label>
    <input type="text" id="patientName" v-model="session.patient.name" required>
    <br>
    <label for="patientLastName">LastName:</label>
    <input type="text" id="patientLastName" v-model="session.patient.lastName" required>
    <br>
    <button type="submit">Save</button>
  </form>
</template>


<style>

form {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background-color: #69BFB7; /* Color de fondo del formulario */
  border: 1px solid #308C83; /* Color del borde del formulario */
  border-radius: 0.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 10px;
  color: #091133; /* Color del texto de los labels */
}

input[type="date"], input[type="text"] {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #308C83; /* Color del borde de los campos de entrada */
  border-radius: 0.5em;
}

input[type="date"]:focus, input[type="text"]:focus {
  border-color: #69BFB7; /* Color del borde de los campos de entrada cuando se enfocan */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

button[type="submit"] {
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: #091133; /* Color de fondo del botón de envío */
  color: #fff; /* Color del texto del botón de envío */
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #308C83;
}
</style>