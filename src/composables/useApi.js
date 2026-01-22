import { ref } from 'vue'
import apiClient from '@/plugins/axios'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  async function get(url, config = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get(url, config)
      return response
    } catch (err) {
      error.value = err.response?.data?.detail || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function post(url, data, config = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post(url, data, config)
      return response
    } catch (err) {
      error.value = err.response?.data?.detail || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function put(url, data, config = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.put(url, data, config)
      return response
    } catch (err) {
      error.value = err.response?.data?.detail || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function del(url, config = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.delete(url, config)
      return response
    } catch (err) {
      error.value = err.response?.data?.detail || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, get, post, put, del }
}
