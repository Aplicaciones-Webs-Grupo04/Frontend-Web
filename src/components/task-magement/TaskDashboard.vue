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
          <th>Actions</th> <!-- Nueva columna para acciones -->
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
          <td>
            <button @click="deleteTask(task.id)">Eliminar</button> <!-- Botón de eliminar -->
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Botón para agregar tareas, ahora debajo de la tabla -->
      <button class="add-task-btn" @click="showAddTaskModal">Agregar Tarea</button>
    </div>

    <!-- Panel de estadísticas a la derecha -->
    <div class="task-stats">
      <h2>Task Statistics</h2>
      <canvas id="taskChart" width="10" height="5"></canvas>
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

// Función para eliminar la tarea de la fake API
const deleteTask = async (taskId) => {
  try {
    // Hacemos una solicitud DELETE a la API para eliminar la tarea
    const response = await fetch(`http://localhost:3000/task/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la tarea');
    }

    // Eliminar la tarea de la lista de tareas
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
  }
};
</script>

<style scoped>
.task-dashboard {
  background-color: #10BEAE; /* Turquoise background color */
  color: black; /* Black text */
  padding: 10px; /* Reduced padding */
  display: flex;
  flex-direction: row; /* Keep the chart next to the task cards */
  gap: 10px; /* Reduced gap */
  height: 100vh; /* Occupy the full height of the viewport */
  width: 100%; /* Occupy the full width of the viewport */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.task-cards {
  flex: 2; /* Take enough space for the task cards */
  background-color: white; /* White background for the task section */
  padding: 10px; /* Reduced padding */
  border-radius: 8px; /* Rounded borders */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth effect */
}

.task-stats {
  flex: 1; /* Take remaining space for the stats */
  background-color: white; /* White background for the stats section */
  padding: 10px; /* Reduced padding */
  border-radius: 8px; /* Rounded borders */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth effect */
}

.task-summary {
  display: flex;
  gap: 5px; /* Reduced gap */
}

.task-list {
  margin-top: 10px; /* Reduced margin */
  border-collapse: collapse;
  width: 100%;
}

.task-list th, .task-list td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 5px; /* Reduced padding */
}

.task-list th {
  background-color: #f2f2f2; /* Light gray background for headers */
}

.task-list tr:nth-child(even) {
  background-color: #f9f9f9; /* Alternating row color */
}

.add-task-btn {
  background-color: #007bff; /* Blue */
  color: white; /* White text */
  border: none; /* No border */
  padding: 5px 10px; /* Reduced internal spacing */
  border-radius: 5px; /* Rounded borders */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 14px; /* Normal font size */
  margin-top: 5px; /* Reduced top margin */
}

.add-task-btn:hover {
  background-color: #0056b3; /* Darker blue on hover */
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
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.8);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 8px;
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

