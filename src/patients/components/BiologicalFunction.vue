<template>
  <div class="biological-functions-container">
    <header class="header">
      <h1>PSYMED</h1>
    </header>
    <div class="content">
      <h2>Biological Functions</h2>
      <p>Mark the quality of your functions:</p>

      <!-- Lista de funciones -->
      <div class="function-group" v-for="func in biologicalFunctions" :key="func.name">
        <h3>{{ func.label }}</h3>
        <div class="rating-buttons">
          <div
              v-for="value in 10"
              :key="value"
              :class="['rating-button', { selected: func.value === value }]"
              @click="selectValue(func.name, value)"
          >
            {{ value }}
          </div>
        </div>
      </div>


      <!-- Botón de guardar -->
      <button class="save-button" @click="saveFunctions">Save</button>

      <!-- Fecha de registro -->
      <div class="date-display">{{ currentDate }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Definir funciones biológicas
const biologicalFunctions = ref([
  { name: 'hunger', label: 'Hunger', value: null },
  { name: 'sleep', label: 'Sleep', value: null },
  { name: 'energy', label: 'Energy', value: null },
  { name: 'hydration', label: 'Hydratation', value: null },
]);

// Función para seleccionar un valor
const selectValue = (functionName, value) => {
  const bioFunction = biologicalFunctions.value.find(f => f.name === functionName);
  if (bioFunction) {
    bioFunction.value = value;
  }
};

// Función para guardar los valores seleccionados
const saveFunctions = () => {
  // Aquí puedes agregar lógica para guardar los datos (por ejemplo, enviarlos a la API o almacenarlos localmente)
  alert('Biological functions saved successfully!');
};

// Obtener la fecha actual
const currentDate = new Date().toLocaleDateString();
</script>

<style scoped>
.biological-functions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eaf6f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.header {
  background-color: #081828;
  color: #ffffff;
  padding: 10px;
  text-align: center;
  width: 100%;
  border-radius: 5px 5px 0 0;
}

.content {
  background-color: #f8f9fa;
  padding: 20px;
  width: 100%;
}

h2 {
  color: #027373;
  margin-bottom: 10px;
  text-align: center;
}

p {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
}

.function-group {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 5px;
  font-size: 18px;
  color: #333;
}

.rating-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.rating-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #027373;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.rating-button.selected {
  background-color: #10BEAE;
}

.rating-button:hover {
  background-color: #089e8c;
}

.save-button {
  background-color: #10BEAE;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0;
}

.save-button:hover {
  background-color: #089e8c;
}

.date-display {
  text-align: center;
  background-color: #081828;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  width: 150px;
  margin: 0 auto;
}
</style>
