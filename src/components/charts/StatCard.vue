<template>
  <v-card>
    <v-card-text class="d-flex align-center">
      <v-avatar :color="color" size="56" class="mr-4">
        <v-icon :icon="icon" color="white" size="28" />
      </v-avatar>
      <div>
        <div class="text-h4 font-weight-bold">
          {{ formattedValue }}
        </div>
        <div class="text-grey">{{ title }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  icon: {
    type: String,
    default: 'mdi-chart-bar'
  },
  color: {
    type: String,
    default: 'primary'
  },
  formatNumber: {
    type: Boolean,
    default: false
  }
})

const formattedValue = computed(() => {
  if (!props.formatNumber || typeof props.value !== 'number') {
    return props.value
  }

  if (props.value >= 1000000) {
    return `${(props.value / 1000000).toFixed(1)}M`
  }
  if (props.value >= 1000) {
    return `${(props.value / 1000).toFixed(1)}K`
  }
  return props.value.toString()
})
</script>
