import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/pages/Dashboard.vue')
      },
      {
        path: 'farms',
        name: 'Farms',
        component: () => import('@/pages/Farms.vue')
      },
      {
        path: 'fields',
        name: 'Fields',
        component: () => import('@/pages/Fields.vue')
      },
      {
        path: 'sensors',
        name: 'Sensors',
        component: () => import('@/pages/Sensors.vue')
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/pages/Analytics.vue')
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: () => import('@/pages/Transactions.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/pages/Settings.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/auth/Register.vue'),
    meta: { guest: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(
    import.meta.env.VITE_AUTH_STORAGE_KEY || 'agri_dashboard_token'
  )
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.guest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
