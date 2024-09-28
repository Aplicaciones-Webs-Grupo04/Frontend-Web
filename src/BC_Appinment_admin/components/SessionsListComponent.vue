<template>
  <div class="session-card">
    <h2 class="title">{{ session.patient.name }} {{ session.patient.lastName }}</h2>
    <p class="subject"> Subject:{{session.asunto}}</p>
    <p class="date">Date of appointment: {{ session.appointmentDate }}</p>
  </div>
</template>

<script>
export default {
  props: {
    session: Object
  }
}
</script>

<style>
.session-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>