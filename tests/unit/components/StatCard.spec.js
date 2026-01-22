import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatCard from '@/components/charts/StatCard.vue'

// Mock Vuetify
const mockVuetify = {
  global: {
    stubs: {
      'v-card': { template: '<div><slot /></div>' },
      'v-card-text': { template: '<div><slot /></div>' },
      'v-avatar': { template: '<div><slot /></div>' },
      'v-icon': { template: '<span />' }
    }
  }
}

describe('StatCard', () => {
  it('renders title and value', () => {
    const wrapper = mount(StatCard, {
      props: {
        title: 'Active Sensors',
        value: 24,
        icon: 'mdi-access-point',
        color: 'primary'
      },
      ...mockVuetify
    })

    expect(wrapper.text()).toContain('Active Sensors')
    expect(wrapper.text()).toContain('24')
  })

  it('formats large numbers when formatNumber is true', () => {
    const wrapper = mount(StatCard, {
      props: {
        title: 'Data Points',
        value: 1200000,
        formatNumber: true
      },
      ...mockVuetify
    })

    expect(wrapper.text()).toContain('1.2M')
  })

  it('formats thousands correctly', () => {
    const wrapper = mount(StatCard, {
      props: {
        title: 'Count',
        value: 5500,
        formatNumber: true
      },
      ...mockVuetify
    })

    expect(wrapper.text()).toContain('5.5K')
  })

  it('does not format when formatNumber is false', () => {
    const wrapper = mount(StatCard, {
      props: {
        title: 'Count',
        value: 5500,
        formatNumber: false
      },
      ...mockVuetify
    })

    expect(wrapper.text()).toContain('5500')
  })
})
