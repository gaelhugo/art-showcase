<template>
  <div style="min-height: 100vh; background-color: #111827; color: white; font-family: sans-serif;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 32px 16px;">
      <header style="text-align: center; padding: 16px 0;">
        <h1 style="font-size: 3rem; font-weight: bold; background: linear-gradient(to right, #f3f4f6, #9ca3af); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          Minimalist Art
        </h1>
        <p style="margin-top: 8px; font-size: 1.25rem; color: #d1d5db;">
          A non exhaustive visual repertoire
        </p>
      </header>
      
      <main style="margin-top: 24px;">
        <div v-if="isLoading" style="text-align: center; color: #9ca3af; font-size: 1.25rem;">
          Loading artists...
        </div>
        <div v-else-if="error" style="text-align: center; color: #f87171; font-size: 1.25rem;">
          Error loading artists: {{ error }}
        </div>
        <div v-else-if="artists.length === 0" style="text-align: center; color: #fbbf24; font-size: 1.25rem;">
          No artists found
        </div>
        <div v-else style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px;">
          <div 
            v-for="(artist, index) in artists" 
            :key="artist.name"
            @click="handleArtistClick(artist)"
            class="artist-card"
            style="position: relative; overflow: hidden; border-radius: 8px; background-color: #1f2937; border: 1px solid #374151; cursor: pointer; transition: transform 0.3s ease; height: 224px;"
          >
            <img 
              :src="artist.thumbnailUrl" 
              :alt="artist.name"
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
            />
            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%); transition: all 0.3s ease;"></div>
            <div style="position: absolute; bottom: 0; left: 0; padding: 16px; width: 100%;">
              <h3 style="font-size: 1.25rem; font-weight: bold; color: white; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{ artist.name }}</h3>
            </div>
          </div>
        </div>
      </main>
      
      <footer style="text-align: center; margin-top: 64px; padding-bottom: 32px; color: #6b7280;">
        <p>Inspired by the pioneers of optical art.</p>
      </footer>
    </div>
    <div 
      v-if="selectedArtist"
      style="position: fixed; inset: 0; z-index: 50; display: flex; justify-content: flex-end;"
    >
      <div 
        class="panel-overlay"
        style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.6); transition: opacity 0.3s ease;"
        @click="handleClosePanel"
      ></div>
      <div 
        style="position: relative; display: flex; flex-direction: column; width: 100%; max-width: 28rem; background-color: #1f2937; color: white; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); transform: translateX(0); transition: transform 0.3s ease-in-out;"
        :class="{ 'slide-in': selectedArtist }"
      >
        <div style="display: flex; align-items: flex-start; justify-content: space-between; padding: 24px; border-bottom: 1px solid #374151;">
          <h2 style="font-size: 1.5rem; font-weight: bold;">{{ selectedArtist.name }}</h2>
          <button 
            @click="handleClosePanel"
            style="padding: 4px; border-radius: 50%; color: #9ca3af; background: none; border: none; cursor: pointer; font-size: 1.5rem;"
          >
            ✕
          </button>
        </div>
        <div style="overflow-y: auto; flex: 1; padding: 24px;">
          <div style="margin-bottom: 24px;">
            <p style="color: #d1d5db; line-height: 1.6; font-size: 0.875rem;">{{ selectedArtist.bio }}</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            <div 
              v-for="(src, index) in selectedArtist.artworkUrls" 
              :key="index"
              style="overflow: hidden; border-radius: 6px; aspect-ratio: 1; background-color: #374151; cursor: pointer; transition: transform 0.2s ease;"
              @click="viewingImage = src"
              @mouseover="$event.target.style.transform = 'scale(1.05)'"
              @mouseout="$event.target.style.transform = 'scale(1)'"
            >
              <img 
                :src="src" 
                :alt="`${selectedArtist.name} artwork ${index + 1}`"
                style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
                @mouseover="$event.target.style.transform = 'scale(1.1)'"
                @mouseout="$event.target.style.transform = 'scale(1)'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div 
      v-if="viewingImage"
      class="fullscreen-viewer"
      style="position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.9); opacity: 0; transition: opacity 0.3s ease;"
      @click="handleCloseFullscreen"
    >
      <div style="position: relative; width: calc(100vw - 40px); height: calc(100vh - 40px); margin: 20px; display: flex; align-items: center; justify-content: center;">
        <img 
          :src="viewingImage" 
          alt="Artwork"
          style="max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; transform: scale(0.8); transition: transform 0.3s ease;"
          class="fullscreen-image"
          @click.stop
        />
        <button 
          @click="handleCloseFullscreen"
          style="position: absolute; top: -10px; right: -10px; background: rgba(0, 0, 0, 0.7); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s ease;"
          @mouseover="$event.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'"
          @mouseout="$event.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.artist-card:hover img {
  transform: scale(1.1);
}

.slide-in {
  animation: slideInFromRight 0.3s ease-out forwards;
}

.fullscreen-viewer {
  animation: fadeIn 0.3s ease forwards;
}

.fullscreen-image {
  animation: scaleIn 0.3s ease forwards;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
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

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Artist } from './types'

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
  const panel = document.querySelector('.slide-in') as HTMLElement
  const overlay = document.querySelector('.panel-overlay') as HTMLElement
  
  if (panel && overlay) {
    panel.style.animation = 'slideOutToRight 0.3s ease-in forwards'
    overlay.style.animation = 'fadeOut 0.3s ease forwards'
    
    setTimeout(() => {
      selectedArtist.value = null
    }, 300)
  } else {
    selectedArtist.value = null
  }
}

const handleCloseFullscreen = () => {
  const viewer = document.querySelector('.fullscreen-viewer') as HTMLElement
  const image = document.querySelector('.fullscreen-image') as HTMLElement
  
  if (viewer && image) {
    viewer.style.animation = 'fadeOut 0.3s ease forwards'
    image.style.animation = 'scaleOut 0.3s ease forwards'
    
    setTimeout(() => {
      viewingImage.value = null
    }, 300)
  } else {
    viewingImage.value = null
  }
}

onMounted(() => {
  console.log('Vue app mounted!')
  fetchArtists()
})
</script>
