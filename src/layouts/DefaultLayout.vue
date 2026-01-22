<template>
  <v-app>
    <AppHeader @toggle-drawer="drawer = !drawer" />
    <AppSidebar v-model="drawer" />
    <v-main>
      <v-container fluid class="pa-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'

const drawer = ref(true)
</script>
