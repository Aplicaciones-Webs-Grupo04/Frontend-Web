<template>
  <div class="medication-list-container">
    <h2>Medications</h2>
    <button v-for="medication in medications" :key="medication.id" class="medication-btn">
      {{ medication.name }} ({{ medication.dosage }})
    </button>
  </div>
</template>

<script setup>
const medications = [
  { id: 1, name: 'Paracetamol', dosage: '500 mg' },
  { id: 2, name: 'Ibuprofen', dosage: '200 mg' },
  { id: 3, name: 'Antidepressant', dosage: '1 tablet' },
];
</script>

<style scoped>
.medication-list-container {
  text-align: center;
}

.medication-btn {
  display: block;
  margin: 5px 0;
  padding: 10px;
  background-color: #b0b3b8;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
