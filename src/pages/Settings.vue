<template>
  <div>
    <h1 class="text-h4 mb-4">Settings</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Appearance</v-card-title>
          <v-card-text>
            <v-switch v-model="darkMode" label="Dark Mode" color="primary" @update:model-value="toggleTheme" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Account</v-card-title>
          <v-card-text>
            <div v-if="user">
              <div class="mb-2"><strong>Email:</strong> {{ user.email }}</div>
              <div class="mb-2"><strong>Name:</strong> {{ user.full_name || 'Not set' }}</div>
              <div class="mb-2"><strong>Public Key:</strong></div>
              <code class="d-block bg-grey-lighten-4 pa-2 rounded text-caption">{{ user.public_key || 'Not available' }}</code>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>API Configuration</v-card-title>
          <v-card-text>
            <div class="mb-2"><strong>API URL:</strong></div>
            <code class="d-block bg-grey-lighten-4 pa-2 rounded">{{ apiUrl }}</code>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Danger Zone</v-card-title>
          <v-card-text>
            <v-btn color="error" variant="outlined" @click="handleLogout">
              <v-icon left>mdi-logout</v-icon>
              Sign Out
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const theme = useTheme()
const authStore = useAuthStore()

const darkMode = ref(theme.global.name.value === 'dark')
const user = computed(() => authStore.user)
const apiUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1'

function toggleTheme(value) {
  theme.global.name.value = value ? 'dark' : 'light'
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  authStore.fetchUser()
})
</script>
