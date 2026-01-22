import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/plugins/axios'

export const useSensorsStore = defineStore('sensors', () => {
  const sensors = ref([])
  const measurements = ref([])
  const loading = ref(false)
  const error = ref(null)

  const activeSensors = computed(() =>
    sensors.value.filter(s => s.status === 'active')
  )

  const sensorsByType = computed(() => {
    const grouped = {}
    sensors.value.forEach(s => {
      const type = s.sensor_type || 'unknown'
      if (!grouped[type]) grouped[type] = []
      grouped[type].push(s)
    })
    return grouped
  })

  async function fetchSensors(farmId = null, fieldId = null) {
    loading.value = true
    error.value = null
    try {
      const params = {}
      if (farmId) params.farm_id = farmId
      if (fieldId) params.field_id = fieldId

      const response = await apiClient.get('/sensors', { params })
      sensors.value = response.data.sensors
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to fetch sensors'
    } finally {
      loading.value = false
    }
  }

  async function registerSensor(sensorData) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/sensors', sensorData)
      sensors.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to register sensor'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchMeasurements(params = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/measurements', { params })
      measurements.value = response.data.measurements
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to fetch measurements'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function recordMeasurement(measurementData) {
    loading.value = true
    try {
      const response = await apiClient.post('/measurements', measurementData)
      measurements.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to record measurement'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    sensors,
    measurements,
    loading,
    error,
    activeSensors,
    sensorsByType,
    fetchSensors,
    registerSensor,
    fetchMeasurements,
    recordMeasurement
  }
})
