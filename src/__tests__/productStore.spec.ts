import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { Product } from '@/types/products'

vi.mock('primevue', () => ({
  useToast: () => ({
    add: vi.fn(),
  }),
}))

vi.mock('@/services/api', () => ({
  default: () => ({
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  }),
}))

import { useProductStore } from '@/stores/useProductStore'

describe('useProductStore', () => {
  let store: ReturnType<typeof useProductStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useProductStore()
    vi.clearAllMocks()
  })

  it('starts with empty state', () => {
    expect(store.products).toEqual([])
    expect(store.product).toBeNull()
    expect(store.isLoading).toBe(true)
  })

  it('filters products by category', () => {
    const testProducts = [
      { id: 1, name: 'Laptop', category: 'electronics', price: 1000 } as Product,
      { id: 2, name: 'T-Shirt', category: 'clothing', price: 25 } as Product,
      { id: 3, name: 'Phone', category: 'electronics', price: 800 } as Product,
    ]

    store.products = testProducts
    store.selectedCategory = ['electronics']

    const result = store.sortedProducts
    expect(result).toHaveLength(2)
    expect(result.every((p) => p.category === 'electronics')).toBe(true)
  })

  it('sorts by price low to high', () => {
    store.products = [
      { id: 1, name: 'Expensive Item', category: 'electronics', price: 500 } as Product,
      { id: 2, name: 'Cheap Item', category: 'electronics', price: 10 } as Product,
      { id: 3, name: 'Medium Item', category: 'electronics', price: 100 } as Product,
    ]

    store.sortBy = 'price-asc'

    const sorted = store.sortedProducts
    expect(sorted[0]!.price).toBe(10)
    expect(sorted[1]!.price).toBe(100)
    expect(sorted[2]!.price).toBe(500)
  })

  it('sorts by name Z to A', () => {
    store.products = [
      { id: 1, name: 'Apple Watch', category: 'electronics', price: 400 } as Product,
      { id: 2, name: 'Nintendo', category: 'electronics', price: 200 } as Product,
      { id: 3, name: 'MacBook', category: 'electronics', price: 1500 } as Product,
    ]

    store.sortBy = 'name-desc'

    const sorted = store.sortedProducts
    expect(sorted[0]!.name).toBe('Nintendo')
    expect(sorted[1]!.name).toBe('MacBook')
    expect(sorted[2]!.name).toBe('Apple Watch')
  })
})
