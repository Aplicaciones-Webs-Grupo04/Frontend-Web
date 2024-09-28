
<script>
import SessionCard from '../components/SessionsComponent.vue';
import { obtenerSessions } from '../Service/session-api.js';
import { Session } from '../entities/Session';

export default {
  components: { SessionCard },
  data() {
    return {
      sessions: []
    }
  },
  mounted() {
    obtenerSessions()
        .then(response => {
          this.sessions = response.map(Session.fromJson);
        })
        .catch(error => {
          console.error(error);
        })
  }
}
</script>
<template>
  <div class="body">
    <ul class="ListCont">
      <li class="list" v-for="session in sessions" :key="session.id">
        <SessionCard :session="session" />
      </li>
    </ul>
  </div>
</template>
<style>

.body {
  max-width: 100%;
  margin: 20px auto;
  padding: 10px;
  background-color: #081828  ;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.ListCont {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.list {
    flex: 1 1 calc(33.333% - 20px);
    box-sizing: border-box;
  }
</style>