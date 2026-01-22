import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/plugins/axios'

const STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY || 'agri_dashboard_token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(STORAGE_KEY) || null)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email, password) {
    loading.value = true
    error.value = null
    try {
      const formData = new FormData()
      formData.append('username', email)
      formData.append('password', password)

      const response = await apiClient.post('/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      token.value = response.data.access_token
      localStorage.setItem(STORAGE_KEY, token.value)

      await fetchUser()
      return true
    } catch (err) {
      error.value = err.response?.data?.detail || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(email, password, fullName) {
    loading.value = true
    error.value = null
    try {
      await apiClient.post('/auth/register', {
        email,
        password,
        full_name: fullName
      })
      return await login(email, password)
    } catch (err) {
      error.value = err.response?.data?.detail || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const response = await apiClient.get('/auth/me')
      user.value = response.data
    } catch (err) {
      logout()
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    fetchUser,
    logout
  }
})
