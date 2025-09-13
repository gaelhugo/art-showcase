<template>
  <div 
    v-if="viewingImage"
    class="fullscreen-viewer"
    :class="{ 'fade-out': isClosing }"
    @click="handleClose"
  >
    <div class="image-container">
      <img 
        :src="viewingImage" 
        alt="Artwork"
        class="fullscreen-image"
        :class="{ 'scale-out': isClosing }"
        @click.stop
      />
      <button 
        @click="handleClose"
        class="close-button"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  viewingImage: string | null
}>()

const emit = defineEmits<{
  close: []
}>()

const isClosing = ref(false)

const handleClose = () => {
  isClosing.value = true
  
  setTimeout(() => {
    emit('close')
    isClosing.value = false
  }, 300)
}
</script>

<style scoped>
.fullscreen-viewer {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: fadeIn 0.3s ease forwards;
}

.image-container {
  position: relative;
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transform: scale(0.8);
  transition: transform 0.3s ease;
  animation: scaleIn 0.3s ease forwards;
}

.close-button {
  position: absolute;
  top: -10px;
  right: -10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.fade-out {
  animation: fadeOut 0.3s ease forwards;
}

.scale-out {
  animation: scaleOut 0.3s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes scaleOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.8);
  }
}
</style>
