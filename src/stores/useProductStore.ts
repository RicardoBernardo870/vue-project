import { defineStore } from 'pinia'
import useApi from '@/services/api'
import type { Product } from '../types/products'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useProductStore = defineStore('productStore', () => {
  const api = useApi()
  const router = useRouter()

  const products = ref<Product[]>([])
  const selectedCategory = ref<string[]>([])
  const sortBy = ref<string>('')

  const isLoading = ref<boolean>(true)

  const getProductList = async () => {
    try {
      if (products.value.length > 0) return

      isLoading.value = true

      const response = await api.get('/products')

      products.value = response.data
    } catch (error) {
      console.error('Error fetching product list:', error)
    } finally {
      isLoading.value = false
    }
  }

  const getProductById = (id: number): Product | undefined => {
    const product = products.value.find((p) => p.id === id)

    if (!product) {
      router.push({ name: 'not-found' })
      return
    }

    return product
  }

  const filteredProducts = computed(() => {
    const productsList = products?.value || []

    if (selectedCategory.value.length === 0) {
      return productsList
    }

    const filtered = productsList.filter((product) =>
      selectedCategory.value.includes(product.category),
    )

    return filtered
  })

  const sortedProducts = computed(() => {
    const list = [...filteredProducts.value]

    switch (sortBy.value) {
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      default:
        return list
    }
  })

  const resetFilters = () => {
    selectedCategory.value = []
  }

  return {
    products,
    isLoading,
    sortedProducts,
    selectedCategory,
    sortBy,
    getProductList,
    getProductById,
    resetFilters,
  }
})
