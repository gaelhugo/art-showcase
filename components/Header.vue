<template>
  <header class="header">
    <h1 class="title">
      Minimal Art
    </h1>
    <p class="subtitle">
      A non exhaustive visual repertoire
    </p>
  </header>
</template>

<script setup lang="ts">
// No props or logic needed for this component
</script>

<style scoped>
.header {
  text-align: center;
  padding: 16px 0;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(to right, #f3f4f6, #9ca3af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin-top: 8px;
  font-size: 1.25rem;
  color: #d1d5db;
}
</style>
