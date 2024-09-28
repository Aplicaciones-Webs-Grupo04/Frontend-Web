<script>
import SessionListComponent from '../components/SessionListComponent.vue';
export default {
  components: { SessionListComponent }
}
</script>

<template>
<div class="headerPage">   <h1 class="titlePage">list of sessions</h1> </div>
  <SessionListComponent />
</template>

<style>
.headerPage {
  background-color: #081828 ;
  color: #fff;
  padding: 1em;
  text-align: center;
}
.titlePage {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

</style>