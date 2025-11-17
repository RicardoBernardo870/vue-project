import { vi } from 'vitest'

//added this because i was getting an error related to localStorage when running tests possibly from a node version?
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
})
