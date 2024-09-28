<template>
  <pv-toast></pv-toast>
  <header>
    <pv-toolbar class="toolbar" fixed>
      <template #start>
        <pv-button class="p-button-text text-white" icon="pi pi-bars" @click="toggleDrawer" />
        <h3>PSYMED</h3>
        <div class="flex-column">
          <router-link v-for="item in items" :key="item.label" v-slot="{ navigate, href }" :to="item.to" custom>
            <pv-button :href="href" class="p-button-text text-white" @click="navigate">{{ item.label }}</pv-button>
          </router-link>
        </div>
      </template>
    </pv-toolbar>
  </header>
  <pv-sidebar v-model:visible="drawer">
    <div class="sidebar-icons">
      <router-link v-for="icon in topIcons" :key="icon.label" v-slot="{ navigate, href }" :to="icon.to" custom>
        <pv-button :icon="icon.icon" class="p-button-text icon-button" :href="href" @click="navigate" />
      </router-link>
      <div class="spacer"></div>
      <router-link :to="loginIcon.to" v-slot="{ navigate, href }" custom>
        <pv-button :icon="loginIcon.icon" class="p-button-text icon-button" :href="href" @click="navigate" />
      </router-link>
    </div>
  </pv-sidebar>
  <router-view/>
</template>

<script>
export default {
  name: 'app',
  title: 'PSYMED',
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Home', to: '/home' },
        { label: 'About', to: '/about' },
        { label: 'Medication', to: '/medication' },
        { label: 'Apoinment Admin', to: '/sessions' },
        { label: 'Add Apoinment', to: '/addSession' },
      ],
      topIcons: [
        { label: 'Home', to: '/home', icon: 'pi pi-home' },
        { label: 'Alerts', to: '/alerts', icon: 'pi pi-bell' },
        { label: 'Profile', to: '/profile', icon: 'pi pi-user' },
        { label: 'Task', to: '/task', icon: 'pi pi-list' },
      ],
      loginIcon: { label: 'Login', to: '/login', icon: 'pi pi-sign-in' }
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<style scoped>
.sidebar-icons {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #081828 ; /* Background color for sidebar */
  padding: 10px; /* Padding for sidebar */
}

.spacer {
  flex-grow: 1;
}

.toolbar {
  background-color: #10BEAE;
  color: #ffffff;
}

.p-button-text.icon-button {
  color: #fff; /* Default icon color */
  margin: 10px 0; /* Margin for icons */
}

.p-button-text.icon-button:hover {
  color: #10BEAE; /* Icon color on hover */
}
</style>