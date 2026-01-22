import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lightTheme = {
  dark: false,
  colors: {
    primary: '#4CAF50',
    secondary: '#8BC34A',
    accent: '#CDDC39',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    success: '#4CAF50',
    background: '#FAFAFA',
    surface: '#FFFFFF'
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#81C784',
    secondary: '#AED581',
    accent: '#DCE775',
    error: '#EF5350',
    warning: '#FFB74D',
    info: '#64B5F6',
    success: '#81C784',
    background: '#121212',
    surface: '#1E1E1E'
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme
    }
  },
  defaults: {
    VCard: {
      elevation: 2
    },
    VBtn: {
      variant: 'elevated'
    }
  }
})
