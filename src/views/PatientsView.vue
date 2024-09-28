<template>
  <div class="patients-view">
    <header class="header">
      <h1>Patient Management</h1>
    </header>

    <div class="patient-list">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.name }}</td>
          <td>{{ patient.email }}</td>
          <td>{{ patient.phone }}</td>
          <td>
            <button @click="viewPatient(patient.id)">View</button>
            <button @click="editPatient(patient.id)">Edit</button>
            <button @click="deletePatient(patient.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Lista de pacientes simulada
const patients = ref([
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
  { id: 3, name: 'David Johnson', email: 'david.johnson@example.com', phone: '555-8765' },
]);

const router = useRouter();

// Detalle Paciente
const viewPatient = (id) => {
  router.push(`/patient-profile/${id}`);
};

// Editar Paciente
const editPatient = (id) => {
  alert(`Editing patient with ID: ${id}`);
  // Editar
};

// Eliminar Pacciente
const deletePatient = (id) => {
  if (confirm('Are you sure you want to delete this patient?')) {
    const index = patients.value.findIndex(patient => patient.id === id);
    if (index !== -1) patients.value.splice(index, 1);
  }
};
</script>

<style scoped>
.patients-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.header {
  background-color: #081828;
  color: #ffffff;
  padding: 10px;
  text-align: center;
  width: 100%;
  border-radius: 5px 5px 0 0;
  margin-bottom: 20px;
}

.patient-list {
  width: 80%;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #10BEAE;
  color: #ffffff;
}

button {
  background-color: #10BEAE;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #089e8c;
}
</style>
