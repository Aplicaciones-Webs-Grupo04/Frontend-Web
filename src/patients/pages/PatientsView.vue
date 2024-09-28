<template>
  <div class="patients-container">
    <header class="header">
      <h1>PSYMED</h1>
    </header>

    <div class="patients-content">
      <h2>Patient Management</h2>
      <v-container>
        <v-row>
          <v-col
              v-for="patient in patients"
              :key="patient.id"
              cols="12"
              sm="6"
              md="4"
          >
            <v-card class="patient-card">
              <v-card-title class="card-title">{{ patient.name }} {{ patient.lastName }}</v-card-title>
              <v-card-subtitle class="card-subtitle">{{ patient.email }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary" @click="viewPatientDetails(patient.id)">
                  View Details
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const patients = ref([]);

// Json
const fetchPatients = async () => {
  try {
    const response = await axios.get('http://localhost:3000/patients');
    patients.value = response.data;
  } catch (error) {
    console.error("Error fetching patients: ", error);
  }
};

// Carga data
onMounted(() => {
  fetchPatients();
});

const viewPatientDetails = (id) => {
  console.log(`View details for patient with ID: ${id}`);
};
</script>

<style scoped>
.patients-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eaf6f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
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

.patients-content {
  background-color: #e0f7f4;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  text-align: center;
}

h2 {
  background-color: #10BEAE;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 0;
  margin-bottom: 15px;
}

.patient-card {
  margin: 10px;
  border: 2px solid #10BEAE;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.patient-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.card-title {
  background-color: #10BEAE;
  color: white;
  padding: 5px;
  border-radius: 5px 5px 0 0;
}

.card-subtitle {
  padding: 5px;
}

.v-btn {
  background-color: #10BEAE !important;
  color: white !important;
  margin: 10px;
}

.v-btn:hover {
  background-color: #089e8c !important;
}
</style>
