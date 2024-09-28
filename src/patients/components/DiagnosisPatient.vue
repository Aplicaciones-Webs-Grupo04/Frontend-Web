<template>
  <div class="diagnosis-container">
    <header class="header">
      <h1>PSYMED</h1>
    </header>

    <div class="diagnosis-content">
      <h2>Diagnosis</h2>
      <div class="diagnosis-card">
        <p><strong>Name:</strong> Generalized Anxiety Disorder (GAD)</p>
        <p>
          <strong>Description:</strong> The patient shows symptoms of persistent and excessive worry about various aspects of life, leading to physical symptoms such as restlessness and difficulty concentrating.
        </p>
        <p><strong>Date:</strong> September 1, 2024</p>
      </div>
    </div>

    <div class="date-display">{{ currentDate }}</div>
  </div>
</template>

<script setup>
const currentDate = new Date().toLocaleDateString();
</script>

<style scoped>
.diagnosis-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f7f8;
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

.diagnosis-content {
  background-color: #eaf6f5;
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

.diagnosis-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.diagnosis-card p {
  margin: 10px 0;
  color: #333;
}

.date-display {
  text-align: center;
  background-color: #10BEAE;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  width: 150px;
  margin: 20px auto 0;
}
</style>
