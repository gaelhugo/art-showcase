<template>
  <div class="app">
    <div class="container">
      <Header />
      
      <main class="main-content">
        <ArtistGrid 
          :artists="artists"
          :isLoading="isLoading"
          :error="error"
          @artistClick="handleArtistClick"
        />
      </main>
      
      <Footer />
    </div>
    <ArtistDetailPanel 
      :selectedArtist="selectedArtist"
      @close="handleClosePanel"
      @imageClick="handleImageClick"
    />
    <FullscreenImageViewer 
      :viewingImage="viewingImage"
      @close="handleCloseFullscreen"
    />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #111827;
  color: white;
  font-family: sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

.main-content {
  margin-top: 24px;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Artist } from './types'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ArtistGrid from './components/ArtistGrid.vue'
import ArtistDetailPanel from './components/ArtistDetailPanel.vue'
import FullscreenImageViewer from './components/FullscreenImageViewer.vue'

const artists = ref<Artist[]>([])
const selectedArtist = ref<Artist | null>(null)
const viewingImage = ref<string | null>(null)
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

const fetchArtists = async () => {
  try {
    console.log('Fetching artists...')
    const response = await fetch('/artists.json')
    console.log('Response status:', response.status)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log('Artists loaded:', data.length, 'artists')
    artists.value = data
  } catch (e) {
    console.error('Error fetching artists:', e)
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'An unknown error occurred.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleArtistClick = (artist: Artist) => {
  selectedArtist.value = artist
}

const handleClosePanel = () => {
  selectedArtist.value = null
}

const handleCloseFullscreen = () => {
  viewingImage.value = null
}

const handleImageClick = (src: string) => {
  viewingImage.value = src
}

onMounted(() => {
  console.log('Vue app mounted!')
  fetchArtists()
})
</script>
