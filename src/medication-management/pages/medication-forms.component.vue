<template>
  <div class="forms-section">
    <!-- lEFT SIDE FOR THE FORMS -->
    <div class="form-container">
      <h5>Medication Name</h5>
      <pv-chips v-model="name" />

      <h5>Dosage/Frequency</h5>
      <pv-chips v-model="interval" separator="," />

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

  <!-- RIGHT SIDE FOR THE FORM -->
  <div class="patient-info">
    <div v-for="medication in medications" :key="medication.id" class="medication-card">
      <h5>Medication Name: {{ medication.name }}</h5>
      <p>Dosage/Frequency: {{ medication.interval}}</p>
      <p>Quantity: {{ medication.quantity }}</p>
      <p>Start Date: {{medication.startedDate}}</p>
      <p>End Date: {{medication.endDate}}</p>
    </div>

  </div>

</template>

<script>

export default {
  data() {
    return {
      name: [],
      interval: [],
      quantity: [],
      startedDate: null,
      endDate: null,
    };
  },
  methods: {
    submitForm() {
      // Lógica para enviar el formulario
      console.log("Medication Name:", this.name);
      console.log("Dosage/Frequency:", this.interval);
      console.log("Quantity:", this.quantity);
      console.log("StartDate:", this.startDate);
      console.log("EndDate:" , this.endDate);
    }
  }
};
</script>
