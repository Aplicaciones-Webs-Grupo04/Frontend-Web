<script setup>
import TaskDashboard from './components/task-magement/TaskDashboard.vue'
</script>

<template>
  <div id="app">
    <div class="banner">
      <h1>PSYMED</h1>
    </div>
    <TaskDashboard />
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.banner {
  background-color: #081828;
  color: white;
  padding: 10px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}
</style>