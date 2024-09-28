<template>
  <div class="calendar-container">
    <h2>Agenda</h2>
    <Datepicker v-model="selectedDate" :format="formatDate" />
    <button class="open-calendar" @click="goToJournal">Open Calendar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Datepicker from 'vue3-datepicker';
import { useRouter } from 'vue-router';

const selectedDate = ref(new Date());

const formatDate = (date) => {
  return date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
};

const router = useRouter();

const goToJournal = () => {
  router.push('/journal-patient');
};
</script>



<style scoped>
.calendar-container {
  text-align: center;
}

.open-calendar {
  background-color: #081828;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
