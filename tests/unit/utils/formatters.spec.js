import { describe, it, expect } from 'vitest'
import { formatNumber, formatSensorType, timeAgo } from '@/utils/formatters'

describe('formatNumber', () => {
  it('formats billions', () => {
    expect(formatNumber(1500000000)).toBe('1.5B')
  })

  it('formats millions', () => {
    expect(formatNumber(2500000)).toBe('2.5M')
  })

  it('formats thousands', () => {
    expect(formatNumber(3500)).toBe('3.5K')
  })

  it('returns small numbers as-is', () => {
    expect(formatNumber(999)).toBe('999')
  })
})

describe('formatSensorType', () => {
  it('formats soil_moisture', () => {
    expect(formatSensorType('soil_moisture')).toBe('Soil Moisture')
  })

  it('formats temperature', () => {
    expect(formatSensorType('temperature')).toBe('Temperature')
  })

  it('handles null', () => {
    expect(formatSensorType(null)).toBe('Unknown')
  })

  it('handles undefined', () => {
    expect(formatSensorType(undefined)).toBe('Unknown')
  })
})

describe('timeAgo', () => {
  it('shows seconds ago', () => {
    const date = new Date(Date.now() - 30000).toISOString()
    expect(timeAgo(date)).toMatch(/\d+s ago/)
  })

  it('shows minutes ago', () => {
    const date = new Date(Date.now() - 300000).toISOString()
    expect(timeAgo(date)).toMatch(/\d+m ago/)
  })

  it('shows hours ago', () => {
    const date = new Date(Date.now() - 7200000).toISOString()
    expect(timeAgo(date)).toMatch(/\d+h ago/)
  })

  it('handles null', () => {
    expect(timeAgo(null)).toBe('N/A')
  })
})
