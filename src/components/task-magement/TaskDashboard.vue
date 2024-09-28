<template>
  <div class="task-dashboard">
    <!-- Panel principal para las tareas -->
    <div class="task-cards">
      <div class="task-header">
        <h1>Task Dashboard</h1>
      </div>

      <div class="task-summary">
        <div>
          <h2>All Tasks</h2>
          <p>{{ tasks.length }}</p>
        </div>
        <div>
          <h2>Incomplete</h2>
          <p>{{ incompleteTasks.length }}</p>
        </div>
        <div>
          <h2>Overdue</h2>
          <p>{{ overdueTasks.length }}</p>
        </div>
        <div>
          <h2>Due Today</h2>
          <p>{{ dueTodayTasks.length }}</p>
        </div>
      </div>

      <table class="task-list">
        <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Patient ID</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.tittle }}</td> <!-- 'tittle' debe corregirse a 'title' en tu API si es un error tipográfico -->
          <td>{{ task.description }}</td>
          <td>{{ task.status === 1 ? 'Complete' : 'Incomplete' }}</td>
          <td>{{ task.idPatient }}</td>
          <td>{{ task.createdAt }}</td>
          <td>{{ task.updatedAt }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Panel de estadísticas a la derecha -->
    <div class="task-stats">
      <h2>Task Statistics</h2>
      <canvas id="taskChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTasks } from '/src/shared/services/taskService';
import Chart from 'chart.js/auto';

const tasks = ref([]);
const incompleteTasks = ref([]);
const overdueTasks = ref([]);
const dueTodayTasks = ref([]);

onMounted(async () => {
  tasks.value = await getTasks();

  // Filtrar tareas incompletas, vencidas y para hoy
  incompleteTasks.value = tasks.value.filter(task => task.status === 0);
  overdueTasks.value = tasks.value.filter(task => new Date(task.dueDate) < new Date() && task.status === 0);
  dueTodayTasks.value = tasks.value.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear();
  });

  // Crear gráfico con Chart.js
  const ctx = document.getElementById('taskChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Open', 'In Progress', 'Completed', 'On Hold', 'Canceled'],
      datasets: [{
        label: 'Task Status',
        data: [
          tasks.value.filter(task => task.status === 0).length,    // Open
          tasks.value.filter(task => task.status === 2).length,    // In Progress
          tasks.value.filter(task => task.status === 1).length,    // Completed
          tasks.value.filter(task => task.status === 3).length,    // On Hold
          tasks.value.filter(task => task.status === 4).length     // Canceled
        ],
        backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0', '#ffcd56', '#c9cbcf'],
        hoverOffset: 4
      }]
    }
  });
});
</script>

<style scoped>
.task-dashboard {
  background-color: white; /* Fondo blanco */
  color: black; /* Texto negro */
  padding: 20px;
  display: flex;
  flex-direction: row; /* Cambia la distribución a horizontal */
  gap: 20px;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  width: 102%; /* Ocupa todo el ancho de la ventana */
}

.task-cards {
  flex: 2; /* Toma el espacio suficiente para los cuadros de tareas */
  overflow-y: auto; /* Permite el desplazamiento si hay muchas tareas */
}

.task-stats {
  flex: 1; /* El panel de estadísticas toma menos espacio */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-stats h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.task-list {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
}

.task-list th, .task-list td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.task-list th {
  background-color: #f2f2f2; /* Un fondo gris claro para las cabeceras */
}

.task-list tr:nth-child(even) {
  background-color: #f9f9f9; /* Fila alternante */
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.task-header h1 {
  font-size: 2em;
}

.task-summary {
  display: flex;
  gap: 10px;
}

.task-summary div {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
}
</style>
