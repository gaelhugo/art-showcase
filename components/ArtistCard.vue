<template>
  <div 
    class="artist-card"
    @click="$emit('click', artist)"
  >
    <img 
      :src="artist.thumbnailUrl" 
      :alt="artist.name"
      class="artist-image"
    />
    <div class="overlay"></div>
    <div class="content">
      <h3 class="artist-name">{{ artist.name }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Artist } from '../types'

defineProps<{
  artist: Artist
}>()

defineEmits<{
  click: [artist: Artist]
}>()
</script>

<style scoped>
.artist-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #1f2937;
  border: 1px solid #374151;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 224px;
}

.artist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
  transition: all 0.3s ease;
}

.content {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px;
  width: 100%;
}

.artist-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.artist-card:hover .artist-image {
  transform: scale(1.1);
}
</style>
