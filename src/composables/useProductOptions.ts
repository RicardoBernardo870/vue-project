import { computed } from 'vue'
import { CATEGORY_OPTIONS, SORT_OPTIONS } from '@/constants/productOptions'

export function useProductOptions() {
  const categoryOptions = computed(() => [...CATEGORY_OPTIONS])
  const sortOptions = computed(() => [...SORT_OPTIONS])

  return {
    categoryOptions,
    sortOptions,
  }
}
