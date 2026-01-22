<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Fields</h1>
      <v-btn color="primary" @click="showAddDialog = true" :disabled="farms.length === 0">
        <v-icon left>mdi-plus</v-icon>
        Add Field
      </v-btn>
    </div>

    <v-row v-if="loading">
      <v-col cols="12"><LoadingSpinner /></v-col>
    </v-row>

    <v-row v-else-if="fields.length === 0">
      <v-col cols="12">
        <v-card>
          <v-card-text class="text-center pa-8">
            <v-icon size="64" color="grey">mdi-grass</v-icon>
            <div class="text-h6 mt-4">No fields registered</div>
            <div class="text-grey">Add fields to your farms to organize sensors</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="field in fields" :key="field.id" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>
            <v-icon color="success" class="mr-2">mdi-grass</v-icon>
            {{ field.name }}
          </v-card-title>
          <v-card-text>
            <div class="mb-2"><strong>Area:</strong> {{ field.area_hectares }} ha</div>
            <div class="mb-2" v-if="field.crop_type"><strong>Crop:</strong> {{ field.crop_type }}</div>
            <div class="mb-2" v-if="field.soil_type"><strong>Soil:</strong> {{ field.soil_type }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary" :to="`/sensors?field=${field.id}`">
              View Sensors
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showAddDialog" max-width="500">
      <v-card>
        <v-card-title>Add New Field</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleAddField">
            <v-text-field v-model="newField.name" label="Field Name" variant="outlined" class="mb-2" />
            <v-select v-model="newField.farm_id" label="Farm" :items="farms" item-title="name" item-value="id" variant="outlined" class="mb-2" />
            <v-text-field v-model.number="newField.area_hectares" label="Area (hectares)" type="number" variant="outlined" class="mb-2" />
            <v-text-field v-model="newField.crop_type" label="Crop Type" variant="outlined" class="mb-2" />
            <v-text-field v-model="newField.soil_type" label="Soil Type" variant="outlined" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showAddDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleAddField" :loading="saving">Create</v-btn>
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
const newField = ref({ name: '', farm_id: '', area_hectares: 0, crop_type: '', soil_type: '', boundaries: [] })

const loading = computed(() => farmsStore.loading)
const fields = computed(() => farmsStore.fields)
const farms = computed(() => farmsStore.farms)

async function handleAddField() {
  saving.value = true
  try {
    await farmsStore.createField(newField.value)
    showAddDialog.value = false
    newField.value = { name: '', farm_id: '', area_hectares: 0, crop_type: '', soil_type: '', boundaries: [] }
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  farmsStore.fetchFarms()
  farmsStore.fetchFields()
})
</script>
