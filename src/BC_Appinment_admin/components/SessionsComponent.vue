<template>
  <div class="session-card">
    <h2 class="title">{{ session.patient.name }} {{ session.patient.lastName }}</h2>
    <p class="subject"> {{session.asunto}}</p>
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
  /* Add some basic styling to the card */
  background-color: #C2F2ED;
  padding: 20px;
  border: 1px solid #69BFB7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  /* Style the title with a larger font size and bold font weight */
  font-size: 24px;
  font-weight: bold;
  color: #308C83;
  margin-bottom: 10px;
}

.subject {
  /* Add some margin to the subject paragraph */
  margin-bottom: 10px;
  color: #69BFB7;
}

.date {
  /* Add some margin to the date paragraph */
  margin-bottom: 20px;
  color: #308C83;
}
</style>