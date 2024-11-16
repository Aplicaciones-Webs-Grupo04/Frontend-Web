<script>
import LoginService from "../Service/LoginService.js";

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const user = await LoginService.login(this.username, this.password);
        console.log('Login exitoso:', user);

        // Aquí puedes manejar el login exitoso (por ejemplo, redirigir al usuario)

        const userRole = user.role;
        console.log('Rol del usuario:', userRole);
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
};
</script>
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input
          type="text"
          v-model="username"
          placeholder="Username"
          required
      />
      <input
          type="password"
          v-model="password"
          placeholder="Contraseña"
          required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
/* Aquí puedes agregar estilos para tu formulario */
</style>