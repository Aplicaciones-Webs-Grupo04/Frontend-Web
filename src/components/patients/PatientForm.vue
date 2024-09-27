<template>
  <div class="patient-form">
    <h2 v-if="isEditMode">Edit Patient</h2>
    <h2 v-else>Add Patient</h2>
    <form @submit.prevent="handleSubmit">
      <InputField v-model:patient.name label="Name" />
      <InputField v-model:patient.lastname label="Last Name" />
      <InputField v-model:patient.email label="Email" type="email" />
      <InputField v-model:patient.phone label="Phone" type="tel" />
      <InputField v-model:patient.birthDay label="BirthDay" type="date" />
      <InputField v-model:patient.dni label="DNI" />

      <Button :label="isEditMode ? 'Update' : 'Add'" />
      </form>
  </div>
</template>

<script setup lang="ts">
import InputField from "../shared/InputField.vue";
import Button from "../shared/Button.vue";
import { mapActions } from "vuex";

export default {
  name: "PatientForm",
  components: {InputField, Button},
  props: {
    isEditMode: Boolean,
    existingPatient: Object,
  },
  data() {
    return {
      patient: this.existingPatient || {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        birthDay: "",
        dni: "",
      },
    };
  },
  methods: {
    ...mapActions(["addPatient", "updatePatient"]),
    handleSubmit() {
      if (this.isEditMode) {
        this.updatePatient(this.patient);
      }else{
        this.addPatient(this.patient);
      }
      this.$emit("formSubmitted");
    },
  },
};
</script>

<style scoped>
@import "src/styles/formStyles.css";
.patient-form {
  max-width: 500px;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
</style>