<template>
  <div class="patient-profile-container">
    <header class="header">
      <h1>PSYMED</h1>
    </header>

    <div class="content">
      <div class="profile-card">
        <!-- Imagen de perfil del paciente -->
        <div class="profile-image">

        </div>

        <!-- Botones de navegación -->
        <div class="navigation-buttons">
          <router-link
              v-for="section in sections"
              :key="section.name"
              :to="section.route"
              class="nav-button"
          >
            {{ section.label }}
          </router-link>
        </div>
      </div>

      <!-- Información del paciente y diagnóstico -->
      <div class="diagnosis-info">
        <h3>Doctor assigned: Dr. Isabel Martínez</h3>
        <p><strong>Diagnostic:</strong> Generalized Anxiety Disorder (GAD)</p>
        <h4>Treatment:</h4>
        <p><strong>Medication:</strong></p>
        <ul>
          <li>Escitalopram 10mg daily</li>
          <li>As needed: Lorazepam 0.5mg for acute anxiety episodes (maximum 2 times per week)</li>
        </ul>
        <p><strong>Therapy:</strong></p>
        <ul>
          <li>Cognitive Behavioral Therapy (CBT) with emphasis on relaxation techniques and mindfulness exercises.</li>
        </ul>
      </div>
    </div>

    <!-- Fecha de la información -->
    <div class="date-display">{{ currentDate }}</div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

// Definimos las secciones de navegación
const sections = ref([
  {name: 'assignments', label: 'Assignments', route: '/journal-patient'},
  {name: 'diagnosis', label: 'Diagnosis', route: '/diagnosis'},
  {name: 'biologicalFunctions', label: 'Biological Functions', route: '/biological-functions'},
  {name: 'moodStatement', label: 'Mood Statement', route: '/mood-statement'},
  {name: 'prescriptions', label: 'Prescriptions', route: '/prescriptions'},
]);

// Obtener la fecha actual
const currentDate = new Date().toLocaleDateString();
</script>

<style scoped>
.patient-profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eaf6f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
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
  display: flex;
  padding: 20px;
  gap: 20px;
  width: 100%;
  background-color: #e0f7f4;
  border-radius: 10px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 250px;
  background-color: #f0f8f8;
  padding: 10px;
  border-radius: 10px;
}

.profile-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #e0e0e0;
  object-fit: cover;
}

.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-button {
  background-color: #027373;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  text-decoration: none;
  display: block;
  text-align: center;
}

.nav-button:hover {
  background-color: #10BEAE;
}

.diagnosis-info {
  flex: 1;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
}

.diagnosis-info h3 {
  margin-bottom: 10px;
  color: #027373;
}

.diagnosis-info p {
  margin-bottom: 5px;
}

ul {
  margin: 0;
  padding-left: 20px;
}

.date-display {
  text-align: center;
  background-color: #10BEAE;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  width: 150px;
  margin: 20px auto 0;
}
</style>
