<template>
  <div>
    <h1 class="text-h4 mb-4">Dashboard</h1>

    <v-row v-if="loading">
      <v-col cols="12">
        <LoadingSpinner />
      </v-col>
    </v-row>

    <template v-else>
      <!-- Stats Cards -->
      <v-row>
        <v-col cols="12" md="4">
          <StatCard
            title="Active Sensors"
            :value="stats.activeSensors"
            icon="mdi-access-point"
            color="primary"
            data-testid="stat-active-sensors"
          />
        </v-col>
        <v-col cols="12" md="4">
          <StatCard
            title="Alerts Today"
            :value="stats.alertsToday"
            icon="mdi-alert"
            color="warning"
          />
        </v-col>
        <v-col cols="12" md="4">
          <StatCard
            title="Data Points (24h)"
            :value="stats.dataPoints"
            icon="mdi-database"
            color="success"
            :format-number="true"
          />
        </v-col>
      </v-row>

      <!-- Charts Row -->
      <v-row class="mt-4">
        <v-col cols="12" lg="8">
          <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
              <span>Soil Moisture Trends</span>
              <v-btn-toggle v-model="timeRange" density="compact" mandatory>
                <v-btn value="day" size="small">Day</v-btn>
                <v-btn value="week" size="small">Week</v-btn>
                <v-btn value="month" size="small">Month</v-btn>
              </v-btn-toggle>
            </v-card-title>
            <v-card-text>
              <TimeSeriesChart
                :data="moistureData"
                label="Soil Moisture (%)"
                color="#4CAF50"
                data-testid="soil-moisture-chart"
              />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card height="100%">
            <v-card-title>Recent Transactions</v-card-title>
            <v-card-text>
              <v-list density="compact">
                <v-list-item
                  v-for="(tx, index) in recentTransactions"
                  :key="index"
                >
                  <template #prepend>
                    <v-icon :color="tx.type === 'alert' ? 'warning' : 'primary'" size="small">
                      {{ tx.type === 'alert' ? 'mdi-alert' : 'mdi-database-plus' }}
                    </v-icon>
                  </template>
                  <v-list-item-title>{{ tx.description }}</v-list-item-title>
                  <v-list-item-subtitle>{{ tx.time }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Additional Charts -->
      <v-row class="mt-4">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Temperature</v-card-title>
            <v-card-text>
              <TimeSeriesChart
                :data="temperatureData"
                label="Temperature (C)"
                color="#FF9800"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Humidity</v-card-title>
            <v-card-text>
              <TimeSeriesChart
                :data="humidityData"
                label="Humidity (%)"
                color="#2196F3"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import StatCard from '@/components/charts/StatCard.vue'
import TimeSeriesChart from '@/components/charts/TimeSeriesChart.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import apiClient from '@/plugins/axios'

const loading = ref(true)
const timeRange = ref('week')

const stats = reactive({
  activeSensors: 0,
  alertsToday: 0,
  dataPoints: 0
})

const moistureData = ref([])
const temperatureData = ref([])
const humidityData = ref([])
const recentTransactions = ref([])

async function fetchDashboardData() {
  loading.value = true
  try {
    // Fetch dashboard stats
    const dashboardResponse = await apiClient.get('/analytics/dashboard')
    stats.activeSensors = dashboardResponse.data.active_sensors || 0
    stats.alertsToday = dashboardResponse.data.alerts_24h || 0
    stats.dataPoints = dashboardResponse.data.measurements_24h || 0

    // Generate sample time series data (replace with real API calls)
    const now = new Date()
    const points = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      points.push({
        timestamp: date.toLocaleDateString(),
        value: Math.random() * 40 + 30
      })
    }

    moistureData.value = points
    temperatureData.value = points.map(p => ({
      ...p,
      value: Math.random() * 15 + 15
    }))
    humidityData.value = points.map(p => ({
      ...p,
      value: Math.random() * 30 + 50
    }))

    recentTransactions.value = [
      { type: 'reading', description: 'Sensor reading recorded', time: '2 min ago' },
      { type: 'reading', description: 'Sensor reading recorded', time: '5 min ago' },
      { type: 'alert', description: 'Low moisture alert', time: '1 hour ago' },
      { type: 'reading', description: 'Sensor reading recorded', time: '1 hour ago' }
    ]
  } catch (err) {
    console.error('Failed to fetch dashboard data:', err)
  } finally {
    loading.value = false
  }
}

watch(timeRange, () => {
  fetchDashboardData()
})

onMounted(() => {
  fetchDashboardData()
})
</script>
