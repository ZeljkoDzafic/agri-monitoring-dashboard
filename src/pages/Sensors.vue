<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Sensors</h1>
      <v-btn color="primary" @click="showAddDialog = true">
        <v-icon left>mdi-plus</v-icon>
        Add Sensor
      </v-btn>
    </div>

    <v-row v-if="loading">
      <v-col cols="12">
        <LoadingSpinner />
      </v-col>
    </v-row>

    <v-row v-else-if="sensors.length === 0">
      <v-col cols="12">
        <v-card>
          <v-card-text class="text-center pa-8">
            <v-icon size="64" color="grey">mdi-access-point-off</v-icon>
            <div class="text-h6 mt-4">No sensors registered</div>
            <div class="text-grey">Add your first sensor to start monitoring</div>
            <v-btn color="primary" class="mt-4" @click="showAddDialog = true">
              Add Sensor
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="sensor in sensors"
        :key="sensor.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon :color="getStatusColor(sensor.status)" class="mr-2">
              mdi-access-point
            </v-icon>
            {{ sensor.sensor_id }}
            <v-spacer />
            <v-chip :color="getStatusColor(sensor.status)" size="small">
              {{ sensor.status }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <div class="mb-2">
              <strong>Type:</strong> {{ formatSensorType(sensor.sensor_type) }}
            </div>
            <div class="mb-2" v-if="sensor.last_reading">
              <strong>Last Reading:</strong> {{ sensor.last_reading.value }} {{ sensor.last_reading.unit }}
            </div>
            <div class="text-grey text-caption">
              Registered: {{ formatDate(sensor.created_at) }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary" @click="viewSensor(sensor)">
              View Details
            </v-btn>
            <v-spacer />
            <v-btn icon size="small" @click="editSensor(sensor)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add Sensor Dialog -->
    <v-dialog v-model="showAddDialog" max-width="500">
      <v-card>
        <v-card-title>Register New Sensor</v-card-title>
        <v-card-text>
          <v-form ref="addForm" @submit.prevent="handleAddSensor">
            <v-text-field
              v-model="newSensor.sensor_id"
              label="Sensor ID"
              :rules="[v => !!v || 'Required']"
              variant="outlined"
              class="mb-2"
            />
            <v-select
              v-model="newSensor.sensor_type"
              label="Sensor Type"
              :items="sensorTypes"
              :rules="[v => !!v || 'Required']"
              variant="outlined"
              class="mb-2"
            />
            <v-select
              v-model="newSensor.farm_id"
              label="Farm"
              :items="farms"
              item-title="name"
              item-value="id"
              :rules="[v => !!v || 'Required']"
              variant="outlined"
              class="mb-2"
            />
            <v-text-field
              v-model="newSensor.manufacturer"
              label="Manufacturer (optional)"
              variant="outlined"
              class="mb-2"
            />
            <v-text-field
              v-model="newSensor.model"
              label="Model (optional)"
              variant="outlined"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showAddDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleAddSensor" :loading="saving">
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSensorsStore } from '@/stores/sensors'
import { useFarmsStore } from '@/stores/farms'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const sensorsStore = useSensorsStore()
const farmsStore = useFarmsStore()

const showAddDialog = ref(false)
const saving = ref(false)
const newSensor = ref({
  sensor_id: '',
  sensor_type: '',
  farm_id: '',
  field_id: '',
  manufacturer: '',
  model: ''
})

const sensorTypes = [
  { title: 'Soil Moisture', value: 'soil_moisture' },
  { title: 'Temperature', value: 'temperature' },
  { title: 'Humidity', value: 'humidity' },
  { title: 'Light', value: 'light' },
  { title: 'pH', value: 'ph' }
]

const loading = computed(() => sensorsStore.loading)
const sensors = computed(() => sensorsStore.sensors)
const farms = computed(() => farmsStore.farms)

function getStatusColor(status) {
  const colors = {
    active: 'success',
    inactive: 'grey',
    maintenance: 'warning',
    error: 'error'
  }
  return colors[status] || 'grey'
}

function formatSensorType(type) {
  return type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || type
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString()
}

function viewSensor(sensor) {
  console.log('View sensor:', sensor)
}

function editSensor(sensor) {
  console.log('Edit sensor:', sensor)
}

async function handleAddSensor() {
  saving.value = true
  try {
    await sensorsStore.registerSensor(newSensor.value)
    showAddDialog.value = false
    newSensor.value = {
      sensor_id: '',
      sensor_type: '',
      farm_id: '',
      field_id: '',
      manufacturer: '',
      model: ''
    }
  } catch (err) {
    console.error('Failed to register sensor:', err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  sensorsStore.fetchSensors()
  farmsStore.fetchFarms()
})
</script>
