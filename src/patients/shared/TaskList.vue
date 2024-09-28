<template>
  <div class="task-list-container">
    <h2>Tasks</h2>
    <div class="task" v-for="task in tasks" :key="task.id">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p><strong>Date:</strong> {{ task.date }}</p>
      <button @click="completeTask(task.id)">Complete</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([
  { id: 1, title: 'Take Morning Medication', description: 'Take 1 tablet of prescribed medication with water after breakfast.', date: 'September 5, 2024' },
  { id: 2, title: 'Complete Mood Journal', description: 'Record your mood and feelings for today in the app.', date: 'September 5, 2024' },
  { id: 3, title: 'Exercise for 30 minutes', description: 'Engage in a light physical activity, such as walking or yoga.', date: 'September 6, 2024' },
]);

const completeTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id);
};
</script>

<style scoped>
.task-list-container {
  text-align: left;
}

.task {
  background-color: #081828;
  color: #ffffff;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
}

button {
  background-color: #10BEAE;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
