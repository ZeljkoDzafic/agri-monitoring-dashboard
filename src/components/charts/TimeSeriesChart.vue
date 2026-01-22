<template>
  <div class="chart-container">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    <div v-else class="text-center text-grey pa-8">
      No data available
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: 'Value'
  },
  color: {
    type: String,
    default: '#4CAF50'
  },
  fill: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['pointClick'])

const chartData = computed(() => {
  if (!props.data || props.data.length === 0) return null

  return {
    labels: props.data.map(d => d.timestamp || d.label),
    datasets: [
      {
        label: props.label,
        data: props.data.map(d => d.value ?? d.avg),
        borderColor: props.color,
        backgroundColor: props.fill ? `${props.color}33` : 'transparent',
        fill: props.fill,
        tension: 0.4
      }
    ]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true
    }
  },
  onClick: (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index
      emit('pointClick', props.data[index])
    }
  }
}))
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
}
</style>
