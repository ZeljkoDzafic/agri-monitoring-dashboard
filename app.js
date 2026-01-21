const { createApp } = Vue

createApp({
  data() {
    return {
      environment: 'Dev',
      theme: 'light',
      farms: ['Danube Valley Farm', 'Sunrise Orchards', 'Green Plain Estate'],
      ranges: ['Last 7 days', 'Last 30 days', 'Custom'],
      statuses: ['Active', 'Offline', 'Maintenance'],
      filters: {
        farm: 'Danube Valley Farm',
        range: 'Last 7 days'
      },
      alerts: [
        {
          title: 'Soil Moisture Low',
          meta: 'Field A2 · 10 min ago',
          action: 'Acknowledge'
        },
        {
          title: 'Temperature Spike',
          meta: 'Greenhouse 3 · 1 hour ago',
          action: 'Review'
        }
      ],
      stats: [
        {
          title: 'Active Sensors',
          value: '24',
          trend: '+3% vs last week',
          trendClass: 'text-emerald-600 dark:text-emerald-400'
        },
        {
          title: 'Alerts Today',
          value: '3',
          trend: '-2 from yesterday',
          trendClass: 'text-amber-500'
        },
        {
          title: 'Data Points',
          value: '1.2M',
          trend: '12% increase',
          trendClass: 'text-emerald-600 dark:text-emerald-400'
        }
      ],
      transactions: [
        {
          title: 'Sensor reading stored',
          meta: 'Sensor A1-04 · 2 min ago',
          badge: 'Verified',
          badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'
        },
        {
          title: 'Alert triggered',
          meta: 'Soil moisture · 1 hour ago',
          badge: 'Action needed',
          badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200'
        },
        {
          title: 'Data shared with partner',
          meta: 'University Lab · 3 hours ago',
          badge: 'Shared',
          badgeClass: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
        }
      ],
      tasks: [
        { title: 'Calibrate Sensor B2-03', done: true },
        { title: 'Export weekly report', done: false },
        { title: 'Schedule irrigation', done: false }
      ]
    }
  },
  computed: {
    themeIcon() {
      return this.theme === 'dark' ? '🌙' : '☀️'
    },
    themeLabel() {
      return this.theme === 'dark' ? 'Dark mode' : 'Light mode'
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('agri-theme')
    if (savedTheme) {
      this.theme = savedTheme
    }
    this.applyTheme()
  },
  methods: {
    applyTheme() {
      document.documentElement.classList.toggle('dark', this.theme === 'dark')
      localStorage.setItem('agri-theme', this.theme)
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      this.applyTheme()
    }
  }
}).mount('#app')
