<template>
  <div class="home-patients-container">
    <header class="header">
      <h1>PSYMED</h1>
    </header>
    <div class="content">
      <!-- Agenda Component -->
      <div class="section agenda">
        <Calendar />
      </div>

      <!-- Tasks Component -->
      <div class="section tasks">
        <TaskList />
      </div>

      <!-- Medication Component -->
      <div class="section medications">
        <MedicationList />
      </div>

      <!-- Therapy Component -->
      <div class="section therapy">
        <Therapy />
      </div>
    </div>
  </div>
</template>



<script setup>
import Calendar from '../shared/Calendar.vue';
import TaskList from '../shared/TaskList.vue';
import MedicationList from '../shared/MedicationList.vue';
import Therapy from '../shared/Therapy.vue';
</script>

<style scoped>
.home-patients-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
}

.header {
  background-color: #081828;
  color: #ffffff;
  padding: 10px;
  text-align: center;
  width: 100%;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.section {
  background-color: #e8f7f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.agenda {
  grid-column: span 1;
}

.tasks {
  grid-column: span 1;
}

.medications {
  grid-column: span 2;
  display: flex;
  justify-content: space-around;
}

.therapy {
  grid-column: span 2;
  text-align: center;
}
</style>
