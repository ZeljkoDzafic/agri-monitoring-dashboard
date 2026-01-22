export const SENSOR_TYPES = [
  { value: 'soil_moisture', label: 'Soil Moisture', unit: '%', icon: 'mdi-water' },
  { value: 'temperature', label: 'Temperature', unit: '°C', icon: 'mdi-thermometer' },
  { value: 'humidity', label: 'Humidity', unit: '%', icon: 'mdi-water-percent' },
  { value: 'light', label: 'Light', unit: 'lux', icon: 'mdi-white-balance-sunny' },
  { value: 'ph', label: 'pH', unit: 'pH', icon: 'mdi-flask' },
  { value: 'nitrogen', label: 'Nitrogen', unit: 'mg/kg', icon: 'mdi-leaf' },
  { value: 'phosphorus', label: 'Phosphorus', unit: 'mg/kg', icon: 'mdi-leaf' },
  { value: 'potassium', label: 'Potassium', unit: 'mg/kg', icon: 'mdi-leaf' }
]

export const SENSOR_STATUS = {
  active: { color: 'success', icon: 'mdi-check-circle' },
  inactive: { color: 'grey', icon: 'mdi-circle-outline' },
  maintenance: { color: 'warning', icon: 'mdi-wrench' },
  error: { color: 'error', icon: 'mdi-alert-circle' }
}

export const TIME_RANGES = [
  { value: 'hour', label: 'Last Hour' },
  { value: 'day', label: 'Last 24 Hours' },
  { value: 'week', label: 'Last Week' },
  { value: 'month', label: 'Last Month' }
]

export const CHART_COLORS = {
  soil_moisture: '#4CAF50',
  temperature: '#FF9800',
  humidity: '#2196F3',
  light: '#FFEB3B',
  ph: '#9C27B0',
  nitrogen: '#8BC34A',
  phosphorus: '#FF5722',
  potassium: '#795548'
}
