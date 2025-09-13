<template>
  <div v-if="isLoading" class="loading-state">
    Loading artists...
  </div>
  <div v-else-if="error" class="error-state">
    Error loading artists: {{ error }}
  </div>
  <div v-else-if="artists.length === 0" class="empty-state">
    No artists found
  </div>
  <div v-else class="artists-grid">
    <ArtistCard 
      v-for="artist in artists" 
      :key="artist.name"
      :artist="artist"
      @click="$emit('artistClick', artist)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Artist } from '../types'
import ArtistCard from './ArtistCard.vue'

defineProps<{
  artists: Artist[]
  isLoading: boolean
  error: string | null
}>()

defineEmits<{
  artistClick: [artist: Artist]
}>()
</script>

<style scoped>
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  font-size: 1.25rem;
}

.loading-state {
  color: #9ca3af;
}

.error-state {
  color: #f87171;
}

.empty-state {
  color: #fbbf24;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}
</style>
