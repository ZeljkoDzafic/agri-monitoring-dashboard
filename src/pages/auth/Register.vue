<template>
  <v-card class="pa-4" elevation="8">
    <v-card-title class="text-center">
      <v-icon icon="mdi-sprout" color="primary" size="48" class="mb-2" />
      <div>Create Account</div>
      <div class="text-subtitle-2 text-grey">Register for agricultural monitoring</div>
    </v-card-title>

    <v-card-text>
      <v-alert v-if="error" type="error" class="mb-4" closable>
        {{ error }}
      </v-alert>

      <v-form @submit.prevent="handleRegister">
        <v-text-field
          v-model="fullName"
          label="Full Name"
          prepend-inner-icon="mdi-account"
          :rules="[rules.required]"
          variant="outlined"
          class="mb-2"
        />

        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          :rules="[rules.required, rules.email]"
          variant="outlined"
          class="mb-2"
        />

        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :rules="[rules.required, rules.minLength]"
          variant="outlined"
          class="mb-2"
        />

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-check"
          :rules="[rules.required, rules.match]"
          variant="outlined"
          class="mb-4"
        />

        <v-btn
          type="submit"
          color="primary"
          block
          size="large"
          :loading="loading"
        >
          Register
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center">
      <span class="text-grey">Already have an account?</span>
      <v-btn variant="text" color="primary" to="/login">
        Sign In
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const rules = {
  required: v => !!v || 'Required',
  email: v => /.+@.+\..+/.test(v) || 'Invalid email',
  minLength: v => v.length >= 8 || 'Min 8 characters',
  match: v => v === password.value || 'Passwords must match'
}

async function handleRegister() {
  const success = await authStore.register(email.value, password.value, fullName.value)
  if (success) {
    router.push('/')
  }
}
</script>
