<template>
  <div class="page-container">
    <div class="forms-section">
      <div class="form-container">
        <h5>Medication Name</h5>
        <pv-chips v-model="name"/>

        <h5>Dosage/Frequency</h5>
        <pv-chips v-model="interval" separator=","/>

        <h5>Quantity</h5>
        <pv-chips v-model="quantity">
          <template #chip="slotProps">
            <div class="chip-template">
              <span>{{ slotProps.value }} - (active) </span>
              <i class="pi pi-user-plus" style="font-size: 14px"></i>
            </div>
          </template>
        </pv-chips>

        <h5>Started Date</h5>
        <pv-calendar v-model="startedDate" date-format="dd/mm/yy">
        </pv-calendar>

        <h5>End Date</h5>
        <pv-calendar v-model="endDate" date-format="dd/mm/yy">
        </pv-calendar>

        <button class="submit-button" @click="submitForm">Save</button>
      </div>
    </div>

    <div class="patient-card">
      <div v-for="medication in medications" :key="medication.id" class="medication-card">
        <h5>Medication Name: {{ medication.name }}</h5>
        <p>Dosage/Frequency: {{ medication.interval }}</p>
        <p>Quantity: {{ medication.quantity }}</p>
        <p>Start Date: {{ medication.startDate }}</p>
        <p>End Date: {{ medication.endDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../shared/services/http-common.js";

export default {
  data() {
    return {
      name: [],
      interval: [],
      quantity: [],
      startedDate: null,
      endDate: null,
      medications: []
    };
  },
  methods: {
    getMedications() {
      http.get("/medications")
          .then(response => {
            this.medications = response.data;
          })
          .catch(error => {
            console.log('Failed to fetch medications data', error);
          });
    },
    addMedication() {
      const newMedication = {
        name: this.name,
        frequency: this.interval,
        quantity: this.quantity,
        startedDate: this.startedDate,
        endDate: this.endDate,
      };

      http.post("/medications", newMedication)
          .then(response => {
            this.medications.push(response.data);
          })
          .catch(error => {
            console.error('Failed to add medication', error);
          });
    }
  },
  mounted() {
    this.getMedications();
  }
};
</script>

<style scoped>
.patient-card {
  background-color: #081828 ; /* Cambia este color según tus necesidades */
  color: #000000;
  padding: 20px;
  border-radius: 8px;
}

.submit-button {
  background-color: #10BEAE; /* Cambia este color según tus necesidades */
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0a8f7a; /* Cambia este color según tus necesidades */
}

.medication-card {
  transition: transform 0.3s ease;
  background-color: #ffffff   ; /* Cambia este color según tus necesidades */
  border: 1px solid #ffffff ; /* Color del borde del formulario */
}

.medication-card:hover {
  transform: scale(1.05);
}
.page-container {
  background-color: #10BEAE; /* Cambia este color según tus necesidades */
  padding: 20px;
  border-radius: 8px;
}
</style>