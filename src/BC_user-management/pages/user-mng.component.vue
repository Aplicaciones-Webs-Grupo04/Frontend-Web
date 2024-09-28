<template>
  <div class="psymed-container">
    <div class="main-panel">
      <div class="left-section">
        <div class="image-placeholder"></div>
        <div class="button-group">
          <pv-button v-for="button in buttons" :key="button.id" :label="button.label" @click="handleButtonClick(button.label)" />
        </div>
      </div>
      <div class="right-section">
        <form class="user-form">
          <input placeholder="Nombre" />
          <input placeholder="Apellido" />
          <input type="email" placeholder="Correo" />
          <input type="password" placeholder="Contraseña" />
          <input type="tel" placeholder="Teléfono" />
          <input placeholder="ID" />
          <input type="date" />
          <pv-button class="save-btn" label="Guardar Cambios" @click="saveChanges" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa el router

const buttons = ref([
  { id: 1, label: 'Tareas' },
  { id: 2, label: 'Funciones Biológicas' },
  { id: 3, label: 'Estado de Ánimo' },
  { id: 4, label: 'Prescripciones' },
]);

const router = useRouter(); // Instancia el router

const handleButtonClick = (label) => {
  switch (label) {
    case 'Funciones Biológicas':
      router.push('/biological-functions');
      break;
    case 'Tareas':
      router.push('/tasks');
      break;

    case 'Estado de Ánimo':
      router.push('/mood-statement');
      break;

    case 'Prescripciones':
      router.push('/prescriptions');
      break;

    default:
      console.log('Botón no configurado');
  }
};

</script>

<style scoped>
.psymed-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7fa;
}

.main-panel {
  display: flex;
  width: 80%;
  background-color: #b2dfdb;
  padding: 20px;
  border-radius: 10px;
}

.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-placeholder {
  width: 200px;
  height: 150px;
  background-color: red;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  flex-direction: column;
}

button {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #00796b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #004d40;
}

.right-section {
  flex: 2;
  padding-left: 20px;
}

.user-form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #00796b;
  border-radius: 5px;
}

.save-btn {
  background-color: #004d40;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #00796b;
}
</style>
