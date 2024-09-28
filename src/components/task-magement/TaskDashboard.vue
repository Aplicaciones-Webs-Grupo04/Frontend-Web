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

      <!-- Botón para agregar tareas, ahora debajo de la tabla -->
      <button class="add-task-btn" @click="showAddTaskModal">Agregar Tarea</button>
    </div>

    <!-- Panel de estadísticas a la derecha -->
    <div class="task-stats">
      <h2>Task Statistics</h2>
      <canvas id="taskChart"></canvas>
    </div>

    <!-- Modal para agregar tarea (inicialmente oculto) -->
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Agregar Nueva Tarea</h2>
        <form @submit.prevent="addTask">
          <label for="title">Título:</label>
          <input type="text" v-model="newTask.title" required />

          <label for="description">Descripción:</label>
          <textarea v-model="newTask.description" required></textarea>

          <label for="status">Estado:</label>
          <select v-model="newTask.status" required>
            <option value="0">Incompleta</option>
            <option value="1">Completa</option>
          </select>

          <button type="submit">Agregar Tarea</button>
        </form>
      </div>
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
const isModalVisible = ref(false); // Estado del modal
const newTask = ref({ tittle: '', description: '', status: 0, idPatient: 1 }); // Datos de la nueva tarea

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

// Mostrar el modal para agregar tarea
const showAddTaskModal = () => {
  isModalVisible.value = true;
};

// Cerrar el modal
const closeModal = () => {
  isModalVisible.value = false;
};

// Función para agregar la tarea a la fake API
const addTask = async () => {
  try {
    // Hacemos una solicitud POST a la API para agregar la nueva tarea
    const response = await fetch('http://localhost:3000/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask.value),
    });

    if (!response.ok) {
      throw new Error('Error al agregar la tarea');
    }

    const addedTask = await response.json();
    tasks.value.push(addedTask); // Añadir la nueva tarea a la lista de tareas
    closeModal(); // Cerrar el modal
    newTask.value = { tittle: '', description: '', status: 0, idPatient: 1 }; // Restablecer el formulario
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
  }
};
</script>

<style scoped>
.task-dashboard {
  background-color: #10BEAE; /* Color del fondo del contenedor */
  color: black; /* Texto negro */
  padding: 20px;
  display: flex;
  flex-direction: row; /* Cambia a columna para organizar mejor */
  gap: 20px;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  width: 100%; /* Ocupa todo el ancho de la ventana */
}

.task-cards {
  flex: 2; /* Toma el espacio suficiente para los cuadros de tareas */
  background-color: white; /* Fondo blanco para la sección de tareas */
  padding: 20px; /* Espaciado interno */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para dar efecto de profundidad */
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-task-btn {
  background-color: #007bff; /* Azul */
  color: white; /* Texto blanco */
  border: none; /* Sin borde */
  padding: 5px 10px; /* Espaciado interno reducido */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar el mouse */
  font-size: 14px; /* Tamaño de fuente normal */
  margin-top: 10px; /* Margen superior para separación */
}

.add-task-btn:hover {
  background-color: #0056b3; /* Azul más oscuro al pasar el mouse */
}

.task-summary {
  display: flex;
  gap: 10px;
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

.modal {
  display: flex; /* Muestra como flex */
  position: fixed; /* Fijo al viewport */
  z-index: 2; /* Sobre otros elementos */
  left: 0;
  top: 0;
  width: 100%; /* Ancho completo */
  height: 100%; /* Altura completa */
  overflow: auto; /* Desplazamiento si es necesario */
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semitransparente */
}

.modal-content {
  background-color: white; /* Fondo blanco para el contenido del modal */
  margin: 15% auto; /* Margen superior e inferior */
  padding: 20px; /* Espaciado interno */
  border: 1px solid #888; /* Borde gris */
  width: 80%; /* Ancho del modal */
  border-radius: 8px; /* Bordes redondeados */
}

.close {
  color: #aaa; /* Color gris */
  float: right; /* A la derecha */
  font-size: 28px; /* Tamaño de la fuente */
  font-weight: bold; /* Negrita */
}

.close:hover,
.close:focus {
  color: black; /* Color negro al pasar el mouse */
  text-decoration: none; /* Sin subrayado */
  cursor: pointer; /* Cambia el cursor al pasar el mouse */
}
</style>

