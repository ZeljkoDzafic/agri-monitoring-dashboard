<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

// Load saved theme preference
const savedTheme = localStorage.getItem('agri-theme')
if (savedTheme) {
  theme.global.name.value = savedTheme
}

// Watch for theme changes
watch(
  () => theme.global.name.value,
  (newTheme) => {
    localStorage.setItem('agri-theme', newTheme)
  }
)
</script>
