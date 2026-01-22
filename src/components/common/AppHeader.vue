<template>
  <v-app-bar elevation="1">
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')" />

    <v-toolbar-title class="d-flex align-center">
      <v-icon icon="mdi-sprout" color="primary" class="mr-2" />
      Agricultural Monitoring Dashboard
    </v-toolbar-title>

    <v-spacer />

    <v-chip
      v-if="isDev"
      size="small"
      color="warning"
      class="mr-2"
    >
      DEV
    </v-chip>

    <v-btn icon @click="toggleTheme">
      <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
    </v-btn>

    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="user">
          <v-list-item-title>{{ user.email }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.full_name }}</v-list-item-subtitle>
        </v-list-item>
        <v-divider />
        <v-list-item @click="$router.push('/settings')">
          <template #prepend>
            <v-icon>mdi-cog</v-icon>
          </template>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogout">
          <template #prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

defineEmits(['toggleDrawer'])

const router = useRouter()
const theme = useTheme()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const isDev = import.meta.env.DEV
const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>
