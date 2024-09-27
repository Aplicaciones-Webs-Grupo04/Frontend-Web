<template>
  <button
      :class="['custom-button', buttonType]"
      @click="handleClick"
      :disabled="disabled">
    {{ label }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button' // Puede ser 'button', 'submit', 'reset'
  },
  variant: {
    type: String,
    default: 'primary' // Variantes posibles: 'primary', 'secondary', 'danger', etc.
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled) {
    emits('click', event);
  }
};
</script>

<style scoped>
.custom-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'DM Sans', sans-serif;
}

.custom-button.primary {
  background-color: #10BEAE; /* Verde Vitalidad */
  color: #FFFFFF;
}

.custom-button.primary:hover {
  background-color: #089e8c; /* Un tono más oscuro del verde */
}

.custom-button.secondary {
  background-color: #081828; /* Azul Profundo */
  color: #FFFFFF;
}

.custom-button.secondary:hover {
  background-color: #041015; /* Un tono más oscuro del azul */
}

.custom-button.danger {
  background-color: #e74c3c; /* Rojo para acciones peligrosas */
  color: #FFFFFF;
}

.custom-button.danger:hover {
  background-color: #c0392b; /* Un tono más oscuro del rojo */
}

.custom-button:disabled {
  background-color: #CCCCCC;
  cursor: not-allowed;
  color: #666666;
}
</style>
