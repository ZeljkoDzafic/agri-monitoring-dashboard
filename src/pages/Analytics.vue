<template>
  <div>
    <h1 class="text-h4 mb-4">Analytics</h1>

    <v-row>
      <v-col cols="12" md="4">
        <v-select v-model="selectedSensor" label="Select Sensor" :items="sensors" item-title="sensor_id" item-value="sensor_id" variant="outlined" clearable />
      </v-col>
      <v-col cols="12" md="4">
        <v-select v-model="interval" label="Interval" :items="intervals" variant="outlined" />
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color="primary" @click="fetchData" :loading="loading" block>
          <v-icon left>mdi-refresh</v-icon>
          Refresh Data
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Time Series Analysis</v-card-title>
          <v-card-text>
            <TimeSeriesChart v-if="timeseriesData.length" :data="timeseriesData" :label="selectedSensor || 'All Sensors'" />
            <div v-else class="text-center pa-8 text-grey">
              Select a sensor and click refresh to load data
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Aggregations by Sensor Type</v-card-title>
          <v-card-text>
            <v-table v-if="aggregations.length">
              <thead>
                <tr><th>Type</th><th>Avg</th><th>Min</th><th>Max</th><th>Count</th></tr>
              </thead>
              <tbody>
                <tr v-for="agg in aggregations" :key="agg.sensor_type">
                  <td>{{ agg.sensor_type }}</td>
                  <td>{{ agg.avg?.toFixed(2) }}</td>
                  <td>{{ agg.min?.toFixed(2) }}</td>
                  <td>{{ agg.max?.toFixed(2) }}</td>
                  <td>{{ agg.count }}</td>
                </tr>
              </tbody>
            </v-table>
            <div v-else class="text-center pa-4 text-grey">No aggregation data</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Export Data</v-card-title>
          <v-card-text>
            <v-btn color="primary" class="mr-2" @click="exportData('json')">
              <v-icon left>mdi-code-json</v-icon> Export JSON
            </v-btn>
            <v-btn color="secondary" @click="exportData('csv')">
              <v-icon left>mdi-file-delimited</v-icon> Export CSV
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSensorsStore } from '@/stores/sensors'
import TimeSeriesChart from '@/components/charts/TimeSeriesChart.vue'
import apiClient from '@/plugins/axios'

const sensorsStore = useSensorsStore()
const selectedSensor = ref(null)
const interval = ref('hour')
const loading = ref(false)
const timeseriesData = ref([])
const aggregations = ref([])

const sensors = computed(() => sensorsStore.sensors)
const intervals = [
  { title: 'Hourly', value: 'hour' },
  { title: 'Daily', value: 'day' },
  { title: 'Weekly', value: 'week' }
]

async function fetchData() {
  loading.value = true
  try {
    if (selectedSensor.value) {
      const response = await apiClient.get(`/analytics/timeseries/${selectedSensor.value}`, {
        params: { interval: interval.value }
      })
      timeseriesData.value = response.data || []
    }
    const aggResponse = await apiClient.get('/analytics/aggregations')
    aggregations.value = aggResponse.data?.aggregations || []
  } catch (err) {
    console.error('Failed to fetch analytics:', err)
  } finally {
    loading.value = false
  }
}

async function exportData(format) {
  window.open(`${apiClient.defaults.baseURL}/analytics/export?format=${format}`, '_blank')
}

onMounted(() => {
  sensorsStore.fetchSensors()
})
</script>
