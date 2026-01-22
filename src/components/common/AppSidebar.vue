<template>
  <v-navigation-drawer :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <v-list nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.route"
        :to="item.route"
        :prepend-icon="item.icon"
        :title="item.title"
        link
      />
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-select
          v-if="farms.length > 0"
          v-model="selectedFarm"
          :items="farms"
          item-title="name"
          item-value="id"
          label="Select Farm"
          variant="outlined"
          density="compact"
          clearable
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useFarmsStore } from '@/stores/farms'

defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update:modelValue'])

const farmsStore = useFarmsStore()

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
  { title: 'Farms', icon: 'mdi-barn', route: '/farms' },
  { title: 'Fields', icon: 'mdi-grass', route: '/fields' },
  { title: 'Sensors', icon: 'mdi-access-point', route: '/sensors' },
  { title: 'Analytics', icon: 'mdi-chart-line', route: '/analytics' },
  { title: 'Transactions', icon: 'mdi-history', route: '/transactions' },
  { title: 'Settings', icon: 'mdi-cog', route: '/settings' }
]

const farms = computed(() => farmsStore.farms)
const selectedFarm = ref(null)

watch(selectedFarm, (farmId) => {
  const farm = farms.value.find(f => f.id === farmId)
  farmsStore.setCurrentFarm(farm || null)
})

onMounted(() => {
  farmsStore.fetchFarms()
})
</script>
