<template>
  <div class="patients-view">
    <h1>Patient Management</h1>

    <!-- Mostrar el botón para agregar un nuevo paciente -->
    <div class="actions">
      <Button label="Add New Patient" @click="showForm = true" />
    </div>

    <!-- Mostrar la lista de pacientes -->
    <PatientList
        :patients="patients"
        @edit="editPatient"
        @delete="deletePatient"
    />

    <!-- Mostrar el formulario para agregar/editar paciente -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal-content">
        <PatientForm
            :isEditMode="isEditMode"
            :existingPatient="currentPatient"
            @formSubmitted="handleFormSubmitted"
        />
        <Button label="Close" @click="closeForm" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import PatientDetails from "../components/patients/PatientDetails.vue";
import PatientForm from "../components/patients/PatientForm.vue";
import Button from "../components/shared/Button.vue";


const store = useStore();
const patients = ref([]);
const showForm = ref(false);
const isEditMode = ref(false);
const currentPatient = ref(null);

// Método para cargar los pacientes desde el store
const fetchPatients = async () => {
  await store.dispatch('fetchPatients');
  patients.value = store.state.patientsModule.patients;
};

// Método para abrir el formulario y editar un paciente
const editPatient = (patient) => {
  currentPatient.value = { ...patient };
  isEditMode.value = true;
  showForm.value = true;
};

// Método para cerrar el formulario
const closeForm = () => {
  showForm.value = false;
  isEditMode.value = false;
  currentPatient.value = null;
};

// Método para manejar el evento de formulario enviado
const handleFormSubmitted = () => {
  fetchPatients();
  closeForm();
};

// Método para eliminar un paciente
const deletePatient = async (patientId) => {
  await store.dispatch('deletePatient', patientId);
  fetchPatients();
};

// Cargar pacientes cuando se monta el componente
onMounted(() => {
  fetchPatients();
});
</script>

<style scoped>
.patients-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.actions {
  text-align: right;
  margin-bottom: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
}
</style>
