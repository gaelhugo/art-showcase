<template>
  <div 
    v-if="selectedArtist"
    class="panel-container"
  >
    <div 
      class="panel-overlay"
      :class="{ 'fade-out': isClosing }"
      @click="handleClose"
    ></div>
    <div 
      class="panel-content"
      :class="{ 'slide-in': selectedArtist && !isClosing, 'slide-out': isClosing }"
    >
      <div class="panel-header">
        <h2 class="artist-title">{{ selectedArtist.name }}</h2>
        <button 
          @click="handleClose"
          class="close-button"
        >
          ✕
        </button>
      </div>
      <div class="panel-body">
        <div class="bio-section">
          <p class="bio-text">{{ selectedArtist.bio }}</p>
        </div>
        <div class="artwork-grid">
          <div 
            v-for="(src, index) in selectedArtist.artworkUrls" 
            :key="index"
            class="artwork-item"
            @click="$emit('imageClick', src)"
          >
            <img 
              :src="src" 
              :alt="`${selectedArtist.name} artwork ${index + 1}`"
              class="artwork-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Artist } from '../types'

defineProps<{
  selectedArtist: Artist | null
}>()

const emit = defineEmits<{
  close: []
  imageClick: [src: string]
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
.panel-container {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: flex-end;
}

.panel-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  transition: opacity 0.3s ease;
}

.panel-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 28rem;
  background-color: #1f2937;
  color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #374151;
}

.artist-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.close-button {
  padding: 4px;
  border-radius: 50%;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.close-button:hover {
  color: white;
}

.panel-body {
  overflow-y: auto;
  flex: 1;
  padding: 24px;
}

.bio-section {
  margin-bottom: 24px;
}

.bio-text {
  color: #d1d5db;
  line-height: 1.6;
  font-size: 0.875rem;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.artwork-item {
  overflow: hidden;
  border-radius: 6px;
  aspect-ratio: 1;
  background-color: #374151;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.artwork-item:hover {
  transform: scale(1.05);
}

.artwork-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.artwork-item:hover .artwork-image {
  transform: scale(1.1);
}

.slide-in {
  animation: slideInFromRight 0.3s ease-out forwards;
}

.slide-out {
  animation: slideOutToRight 0.3s ease-in forwards;
}

.fade-out {
  animation: fadeOut 0.3s ease forwards;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
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
</style>
