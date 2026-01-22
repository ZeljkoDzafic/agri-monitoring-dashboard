import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/plugins/axios'

export const useFarmsStore = defineStore('farms', () => {
  const farms = ref([])
  const fields = ref([])
  const currentFarm = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchFarms() {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/farms')
      farms.value = response.data.farms
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to fetch farms'
    } finally {
      loading.value = false
    }
  }

  async function createFarm(farmData) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/farms', farmData)
      farms.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to create farm'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchFields(farmId = null) {
    loading.value = true
    error.value = null
    try {
      const params = farmId ? { farm_id: farmId } : {}
      const response = await apiClient.get('/fields', { params })
      fields.value = response.data.fields
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to fetch fields'
    } finally {
      loading.value = false
    }
  }

  async function createField(fieldData) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/fields', fieldData)
      fields.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to create field'
      throw err
    } finally {
      loading.value = false
    }
  }

  function setCurrentFarm(farm) {
    currentFarm.value = farm
  }

  return {
    farms,
    fields,
    currentFarm,
    loading,
    error,
    fetchFarms,
    createFarm,
    fetchFields,
    createField,
    setCurrentFarm
  }
})
