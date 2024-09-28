<template>
  <div class="mood-container">
    <header class="header">
      <h1>PSYMED</h1>
    </header>

    <div class="mood-content">
      <h2>Mood Statement</h2>
      <p>How do you feel today?</p>

      <div class="mood-options">
        <img
            v-for="mood in moods"
            :key="mood.id"
            :src="mood.src"
            :alt="mood.alt"
            :class="{ selected: selectedMood === mood.id }"
            class="mood-icon"
            @click="selectMood(mood.id)"
        />
      </div>

      <button class="save-button" @click="saveMood">Save</button>
    </div>

    <div class="date-display">{{ currentDate }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Lista de estados de ánimo
const moods = [
  { id: 1, src: new URL('@/assets/images/VerySad.png', import.meta.url).href, alt: 'Very Sad' },
  { id: 2, src: new URL('@/assets/images/Sad.png', import.meta.url).href, alt: 'Sad' },
  { id: 3, src: new URL('@/assets/images/Neutral.png', import.meta.url).href, alt: 'Neutral' },
  { id: 4, src: new URL('@/assets/images/Happy.png', import.meta.url).href, alt: 'Happy' },
  { id: 5, src: new URL('@/assets/images/VeryHappy.png', import.meta.url).href, alt: 'Very Happy' },
];

// Estado seleccionado
const selectedMood = ref(null);

// Función para seleccionar un estado de ánimo
const selectMood = (id) => {
  selectedMood.value = id;
};

const saveMood = () => {
  if (selectedMood.value) {
    alert(`Mood saved: ${moods.find(mood => mood.id === selectedMood.value).alt}`);
    //Guardado
  } else {
    alert('Please select a mood before saving.');
  }
};

// Obtener la fecha actual
const currentDate = new Date().toLocaleDateString();
</script>

<style scoped>
.mood-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eaf6f5;
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

.mood-content {
  background-color: #e0f7f4;
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

.mood-options {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.mood-icon {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s;
}

.mood-icon:hover {
  transform: scale(1.2);
}

.selected {
  transform: scale(1.2);
  border: 3px solid #10BEAE;
  border-radius: 50%;
}

.save-button {
  background-color: #10BEAE;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #089e8c;
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
