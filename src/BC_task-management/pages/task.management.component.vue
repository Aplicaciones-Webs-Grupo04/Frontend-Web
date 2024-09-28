<template>
  <div class="task-dashboard">
    <!-- Main panel for tasks -->
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
          <th>Actions</th> 
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status === 1 ? 'Complete' : 'Incomplete' }}</td>
          <td>{{ task.idPatient }}</td>
          <td>{{ task.createdAt }}</td>
          <td>{{ task.updatedAt }}</td>
          <td>
            <button @click="deleteTask(task.id)">Delete</button> <!-- Delete button -->
          </td>
        </tr>
        </tbody>
      </table>

      <button class="add-task-btn" @click="showAddTaskModal">Add Task</button>
    </div>


    <div class="task-stats">
      <h2>Task Statistics</h2>
      <canvas id="taskChart" width="10" height="5"></canvas>
    </div>


    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Add New Task</h2>
        <form @submit.prevent="addTask">
          <label for="title">Title:</label>
          <input type="text" v-model="newTask.title" required />

          <label for="description">Description:</label>
          <textarea v-model="newTask.description" required></textarea>

          <label for="status">Status:</label>
          <select v-model="newTask.status" required>
            <option value="0">Incomplete</option>
            <option value="1">Complete</option>
          </select>

          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTasks, addTask as apiAddTask, deleteTask as apiDeleteTask } from '/src/BC_task-management/services/task-api.service.js';
import Chart from 'chart.js/auto';

const tasks = ref([]);
const incompleteTasks = ref([]);
const overdueTasks = ref([]);
const dueTodayTasks = ref([]);
const isModalVisible = ref(false); // Modal state
const newTask = ref({ title: '', description: '', status: 0, idPatient: 1 }); 

onMounted(async () => {
  tasks.value = await getTasks();

  // Filter incomplete, overdue, and due today tasks
  incompleteTasks.value = tasks.value.filter(task => task.status === 0);
  overdueTasks.value = tasks.value.filter(task => new Date(task.dueDate) < new Date() && task.status === 0);
  dueTodayTasks.value = tasks.value.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear();
  });

  // Create chart with Chart.js
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

// Show the modal to add task
const showAddTaskModal = () => {
  isModalVisible.value = true;
};

// Close the modal
const closeModal = () => {
  isModalVisible.value = false;
};

// Function to add the task using the API
const addTask = async () => {
  try {
    const addedTask = await apiAddTask(newTask.value);
    if (addedTask) {
      tasks.value.push(addedTask); // Add the new task to the task list
      closeModal(); // Close the modal
      newTask.value = { title: '', description: '', status: 0, idPatient: 1 }; // Reset the form
    } else {
      throw new Error('Failed to add task');
    }
  } catch (error) {
    console.error('Error adding task:', error);
    alert(`Error adding task: ${error.response ? error.response.data : error.message}`);
  }
};

// Function to delete the task using the API
const deleteTask = async (taskId) => {
  try {
    const deletedTask = await apiDeleteTask(taskId);
    if (deletedTask) {
      tasks.value = tasks.value.filter(task => task.id !== taskId); 
    } else {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    alert(`Error deleting task: ${error.response ? error.response.data : error.message}`);
  }
};
</script>

<style scoped>
.task-dashboard {
  background-color: #10BEAE;
  color: black; 
  padding: 10px; 
  display: flex;
  flex-direction: row; 
  gap: 10px; 
  height: 100vh; 
  width: 100%; 
  justify-content: center; 
  align-items: center; 
}

.task-cards {
  flex: 2; 
  background-color: white; 
  padding: 10px; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.task-stats {
  flex: 1; 
  background-color: white; 
  padding: 10px; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-summary {
  display: flex;
  gap: 5px; 
}

.task-list {
  margin-top: 10px; 
  border-collapse: collapse;
  width: 100%;
}

.task-list th, .task-list td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 5px; 
}

.task-list th {
  background-color: #f2f2f2; 
}

.task-list tr:nth-child(even) {
  background-color: #f9f9f9;
}

.add-task-btn {
  background-color: #007bff; /* Blue */
  color: white;
  border: none; 
  padding: 5px 10px; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 14px; 
  margin-top: 5px; 
}

.add-task-btn:hover {
  background-color: #0056b3; 
}

.modal {
  display: flex;
  justify-content: center; 
  align-items: center; 
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
  color: #aaa;
  float: right; 
  font-size: 28px; 
  font-weight: bold; 
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none; 
  cursor: pointer;
}
</style>
