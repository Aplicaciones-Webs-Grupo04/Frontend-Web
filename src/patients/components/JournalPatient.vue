<template>
  <div class="journal-container">
    <header class="header">
      <h1>PSYMED</h1>
    </header>

    <div class="journal-content">
      <h2>Calendar of Assignments</h2>
      <div class="assignments-list">
        <div class="assignment-item" v-for="(assignment, index) in assignments" :key="index">
          <div class="assignment-details">
            <p><strong>{{ assignment.date }}</strong></p>
            <p>{{ assignment.time }}</p>
          </div>
          <div class="assignment-type">
            <p>{{ assignment.type }}</p>
          </div>
        </div>
      </div>
      <button class="back-button" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const assignments = [
  {
    date: 'Lunes 2 de septiembre 2024',
    time: '10:00am-11:30am',
    type: 'Therapy',
  },
  {
    date: 'Lunes 2 de septiembre 2024',
    time: '10:00am-11:30am',
    type: 'Therapy',
  },
  {
    date: 'Lunes 2 de septiembre 2024',
    time: '10:00am-11:30am',
    type: 'Therapy',
  },
  {
    date: 'Lunes 2 de septiembre 2024',
    time: '10:00am-11:30am',
    type: 'Therapy',
  },
  {
    date: 'Lunes 2 de septiembre 2024',
    time: '10:00am-11:30am',
    type: 'Therapy',
  },
];

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.journal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eaf6f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
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

.journal-content {
  background-color: #e0f7f4;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  text-align: center;
}

h2 {
  background-color: #081828;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 0;
  margin-bottom: 15px;
}

.assignments-list {
  background-color: #10BEAE;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.assignment-item {
  display: flex;
  justify-content: space-between;
  background-color: #027373;
  padding: 10px;
  border-radius: 5px;
  color: #ffffff;
}

.assignment-details {
  text-align: left;
}

.assignment-type {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #10BEAE;
  padding: 5px;
  border-radius: 5px;
  width: 80px;
}

.back-button {
  margin-top: 20px;
  background-color: #081828;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #10BEAE;
}
</style>
