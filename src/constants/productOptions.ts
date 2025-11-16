export const CATEGORY_OPTIONS = [
  { label: 'Sensors', value: 'sensors' },
  { label: 'Microcontrollers', value: 'microcontrollers' },
  { label: 'Power', value: 'power' },
] as const

export const SORT_OPTIONS = [
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Name Z-A', value: 'name-desc' },
  { label: 'Price Low-High', value: 'price-asc' },
  { label: 'Price High-Low', value: 'price-desc' },
] as const

export type Category = (typeof CATEGORY_OPTIONS)[number]['value']
export type SortOption = (typeof SORT_OPTIONS)[number]['value']
