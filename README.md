# Agri BigchainDB Dashboard

**Repository:** https://github.com/ZeljkoDzafic/agri-bigchaindb-dashboard

## Overview

A Vue.js single-page application (SPA) that provides an intuitive dashboard for farmers and researchers to visualize agricultural sensor data stored in BigchainDB. The dashboard includes interactive visualizations, geospatial mapping of sensor deployments, and administrative tools for managing data sharing permissions.

## Features

- Real-time sensor data visualization with interactive charts
- Geospatial mapping of farms, fields, and sensor locations
- Historical data analysis with time-range selection
- Data sharing permission management
- Transaction history and audit trail viewing
- Responsive design for desktop and tablet devices
- Dark/Light theme support

## Screenshots

```
┌─────────────────────────────────────────────────────────────────┐
│  🌾 Agricultural Monitoring Dashboard                     [👤]  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Active      │  │ Alerts      │  │ Data Points │             │
│  │ Sensors: 24 │  │ Today: 3    │  │ 1.2M        │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Soil Moisture (%)                     │   │
│  │  60│    ╭──╮                                            │   │
│  │  40│───╯    ╰───╮    ╭──╮                              │   │
│  │  20│            ╰────╯  ╰───                           │   │
│  │    └────────────────────────────────────────────────    │   │
│  │     Jan 15   Jan 16   Jan 17   Jan 18   Jan 19         │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │      Farm Map           │  │    Recent Transactions      │  │
│  │  ┌───┐  ┌───┐          │  │  • Sensor reading - 2m ago  │  │
│  │  │ F1│  │ F2│  📍       │  │  • Sensor reading - 5m ago  │  │
│  │  └───┘  └───┘          │  │  • Alert triggered - 1h ago │  │
│  │       📍    📍          │  │  • Sensor reading - 1h ago  │  │
│  └─────────────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

- **Framework:** Vue.js 3 (Composition API)
- **State Management:** Pinia
- **UI Components:** Vuetify 3
- **Charts:** Chart.js / vue-chartjs
- **Maps:** Leaflet / vue-leaflet
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Testing:** Vitest + Vue Test Utils

## Requirements

- Node.js 18+
- npm 9+ or yarn 1.22+

## Installation

```bash
# Clone the repository
git clone https://github.com/ZeljkoDzafic/agri-monitoring-dashboard.git
cd agri-monitoring-dashboard

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

## Configuration

### Environment Variables (.env.local)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws

# Map Configuration
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_MAP_DEFAULT_CENTER=[45.267136, 19.833549]
VITE_MAP_DEFAULT_ZOOM=12

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SHARING=true
VITE_ENABLE_EXPORT=true

# Authentication
VITE_AUTH_STORAGE_KEY=agri_dashboard_token
```

## Project Structure

```
agri-monitoring-dashboard/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.js                 # Application entry point
│   ├── App.vue                 # Root component
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.scss
│   │   │   └── variables.scss
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppSidebar.vue
│   │   │   └── LoadingSpinner.vue
│   │   ├── charts/
│   │   │   ├── SoilMoistureChart.vue
│   │   │   ├── TemperatureChart.vue
│   │   │   ├── TimeSeriesChart.vue
│   │   │   └── StatCard.vue
│   │   ├── maps/
│   │   │   ├── FarmMap.vue
│   │   │   ├── SensorMarker.vue
│   │   │   └── FieldPolygon.vue
│   │   ├── sensors/
│   │   │   ├── SensorList.vue
│   │   │   ├── SensorDetail.vue
│   │   │   └── SensorRegistration.vue
│   │   └── sharing/
│   │       ├── PermissionManager.vue
│   │       └── ShareDialog.vue
│   ├── composables/
│   │   ├── useApi.js
│   │   ├── useAuth.js
│   │   ├── useSensors.js
│   │   └── useWebSocket.js
│   ├── layouts/
│   │   ├── DefaultLayout.vue
│   │   └── AuthLayout.vue
│   ├── pages/
│   │   ├── Dashboard.vue
│   │   ├── Farms.vue
│   │   ├── Fields.vue
│   │   ├── Sensors.vue
│   │   ├── Analytics.vue
│   │   ├── Transactions.vue
│   │   ├── Settings.vue
│   │   └── auth/
│   │       ├── Login.vue
│   │       └── Register.vue
│   ├── plugins/
│   │   ├── vuetify.js
│   │   └── axios.js
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── auth.js
│   │   ├── farms.js
│   │   ├── sensors.js
│   │   └── measurements.js
│   └── utils/
│       ├── formatters.js
│       ├── validators.js
│       └── constants.js
├── tests/
│   ├── unit/
│   │   └── components/
│   └── e2e/
│       └── specs/
├── index.html
├── vite.config.js
├── vitest.config.js
├── package.json
└── README.md
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server on http://localhost:5173

# Building
npm run build            # Production build to ./dist
npm run preview          # Preview production build locally

# Testing
npm run test             # Run unit tests
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run end-to-end tests (requires running backend)

# Code Quality
npm run lint             # Lint with ESLint
npm run lint:fix         # Lint and auto-fix
npm run format           # Format with Prettier
```

## Component Examples

### Dashboard Page (Dashboard.vue)

```vue
<template>
  <v-container fluid>
    <v-row>
      <!-- Stats Cards -->
      <v-col cols="12" md="4">
        <StatCard
          title="Active Sensors"
          :value="stats.activeSensors"
          icon="mdi-access-point"
          color="primary"
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
          title="Data Points"
          :value="formatNumber(stats.dataPoints)"
          icon="mdi-database"
          color="success"
        />
      </v-col>
    </v-row>

    <v-row>
      <!-- Main Chart -->
      <v-col cols="12" lg="8">
        <v-card>
          <v-card-title>Soil Moisture Trends</v-card-title>
          <v-card-text>
            <TimeSeriesChart
              :data="moistureData"
              :options="chartOptions"
              @point-click="handlePointClick"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Farm Map -->
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-title>Farm Overview</v-card-title>
          <v-card-text>
            <FarmMap
              :center="mapCenter"
              :sensors="sensors"
              :fields="fields"
              @sensor-click="showSensorDetail"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSensors } from '@/composables/useSensors'
import StatCard from '@/components/charts/StatCard.vue'
import TimeSeriesChart from '@/components/charts/TimeSeriesChart.vue'
import FarmMap from '@/components/maps/FarmMap.vue'

const { sensors, stats, fetchDashboardData } = useSensors()

onMounted(() => {
  fetchDashboardData()
})
</script>
```

### Sensor Composable (useSensors.js)

```javascript
import { ref, computed } from 'vue'
import { useApi } from './useApi'

export function useSensors() {
  const { get, post } = useApi()

  const sensors = ref([])
  const loading = ref(false)
  const error = ref(null)

  const activeSensors = computed(() =>
    sensors.value.filter(s => s.status === 'active')
  )

  async function fetchSensors(farmId) {
    loading.value = true
    try {
      const response = await get(`/farms/${farmId}/sensors`)
      sensors.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchMeasurements(sensorId, params) {
    return await get(`/sensors/${sensorId}/measurements`, { params })
  }

  return {
    sensors,
    activeSensors,
    loading,
    error,
    fetchSensors,
    fetchMeasurements
  }
}
```

## Testing

### Unit Test Example

```javascript
// tests/unit/components/StatCard.spec.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import StatCard from '@/components/charts/StatCard.vue'

describe('StatCard', () => {
  it('renders title and value', () => {
    const wrapper = mount(StatCard, {
      props: {
        title: 'Active Sensors',
        value: 24,
        icon: 'mdi-access-point',
        color: 'primary'
      }
    })

    expect(wrapper.text()).toContain('Active Sensors')
    expect(wrapper.text()).toContain('24')
  })

  it('formats large numbers', () => {
    const wrapper = mount(StatCard, {
      props: {
        title: 'Data Points',
        value: 1200000,
        formatNumber: true
      }
    })

    expect(wrapper.text()).toContain('1.2M')
  })
})
```

### E2E Test Example

```javascript
// tests/e2e/specs/dashboard.spec.js
describe('Dashboard', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password')
    cy.visit('/dashboard')
  })

  it('displays sensor statistics', () => {
    cy.get('[data-testid="stat-active-sensors"]')
      .should('be.visible')
      .and('contain', 'Active Sensors')

    cy.get('[data-testid="soil-moisture-chart"]')
      .should('be.visible')
  })

  it('allows date range selection', () => {
    cy.get('[data-testid="date-range-picker"]').click()
    cy.get('[data-testid="last-7-days"]').click()

    cy.get('[data-testid="chart-loading"]').should('not.exist')
    cy.get('[data-testid="soil-moisture-chart"]')
      .find('canvas')
      .should('exist')
  })
})
```

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Output structure
dist/
├── index.html
├── assets/
│   ├── index.[hash].js
│   ├── index.[hash].css
│   └── ...
└── favicon.ico
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://api:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## UI Layout Guidance

The dashboard follows a standard three-panel layout:

- **Header:** Project title, environment indicator (dev/prod), and user identity
- **Left Panel:** Field/sensor filters and time range controls
- **Main Panel:** Charts for soil moisture, temperature, humidity, and pH
- **Right Panel:** Provenance details and recent transactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| No data displayed | Verify `VITE_API_BASE_URL` and confirm the API is reachable |
| CORS errors | Ensure the API allows the dashboard origin in CORS settings |
| Slow chart rendering | Decrease refresh interval or limit the default time range |
| WebSocket disconnections | Check network stability and `VITE_WS_URL` configuration |
| Authentication issues | Clear browser localStorage and re-login |

## License

MIT License


