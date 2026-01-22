<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Farms</h1>
      <v-btn color="primary" @click="showAddDialog = true">
        <v-icon left>mdi-plus</v-icon>
        Add Farm
      </v-btn>
    </div>

    <v-row v-if="loading">
      <v-col cols="12">
        <LoadingSpinner />
      </v-col>
    </v-row>

    <v-row v-else-if="farms.length === 0">
      <v-col cols="12">
        <v-card>
          <v-card-text class="text-center pa-8">
            <v-icon size="64" color="grey">mdi-barn</v-icon>
            <div class="text-h6 mt-4">No farms registered</div>
            <div class="text-grey">Add your first farm to get started</div>
            <v-btn color="primary" class="mt-4" @click="showAddDialog = true">
              Add Farm
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="farm in farms"
        :key="farm.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card>
          <v-card-title>
            <v-icon color="primary" class="mr-2">mdi-barn</v-icon>
            {{ farm.name }}
          </v-card-title>
          <v-card-text>
            <div class="mb-2">
              <strong>Area:</strong> {{ farm.area_hectares }} hectares
            </div>
            <div class="mb-2" v-if="farm.crop_types?.length">
              <strong>Crops:</strong>
              <v-chip
                v-for="crop in farm.crop_types"
                :key="crop"
                size="small"
                class="ml-1"
              >
                {{ crop }}
              </v-chip>
            </div>
            <div class="text-grey text-caption">
              Created: {{ formatDate(farm.created_at) }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary" :to="`/fields?farm=${farm.id}`">
              View Fields
            </v-btn>
            <v-spacer />
            <v-btn icon size="small">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add Farm Dialog -->
    <v-dialog v-model="showAddDialog" max-width="500">
      <v-card>
        <v-card-title>Add New Farm</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleAddFarm">
            <v-text-field
              v-model="newFarm.name"
              label="Farm Name"
              :rules="[v => !!v || 'Required']"
              variant="outlined"
              class="mb-2"
            />
            <v-text-field
              v-model.number="newFarm.area_hectares"
              label="Area (hectares)"
              type="number"
              :rules="[v => v > 0 || 'Must be positive']"
              variant="outlined"
              class="mb-2"
            />
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model.number="newFarm.location.latitude"
                  label="Latitude"
                  type="number"
                  step="0.000001"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model.number="newFarm.location.longitude"
                  label="Longitude"
                  type="number"
                  step="0.000001"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-combobox
              v-model="newFarm.crop_types"
              label="Crop Types"
              multiple
              chips
              closable-chips
              variant="outlined"
              class="mb-2"
            />
            <v-textarea
              v-model="newFarm.description"
              label="Description"
              variant="outlined"
              rows="3"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showAddDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleAddFarm" :loading="saving">
            Create Farm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFarmsStore } from '@/stores/farms'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const farmsStore = useFarmsStore()

const showAddDialog = ref(false)
const saving = ref(false)
const newFarm = ref({
  name: '',
  area_hectares: 0,
  location: { latitude: 45.0, longitude: 18.0 },
  crop_types: [],
  description: ''
})

const loading = computed(() => farmsStore.loading)
const farms = computed(() => farmsStore.farms)

function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString()
}

async function handleAddFarm() {
  saving.value = true
  try {
    await farmsStore.createFarm(newFarm.value)
    showAddDialog.value = false
    newFarm.value = {
      name: '',
      area_hectares: 0,
      location: { latitude: 45.0, longitude: 18.0 },
      crop_types: [],
      description: ''
    }
  } catch (err) {
    console.error('Failed to create farm:', err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  farmsStore.fetchFarms()
})
</script>
