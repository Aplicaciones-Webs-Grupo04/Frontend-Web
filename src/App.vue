<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/patients" class="nav-link">Patients</RouterLink>
      </nav>
    </header>

    <!-- Renderizamos el contenido según la ruta activa -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: 'DM Sans', sans-serif;
  color: #4F4F4F;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
}

.navbar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #081828; /* Azul Profundo - Secundario */
}

.nav-link {
  color: #FFFFFF;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #10BEAE; /* Verde Vitalidad - Principal */
  border-radius: 5px;
}

main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
