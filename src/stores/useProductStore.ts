import { defineStore } from 'pinia'
import useApi from '@/services/api'
import type { Product } from '../types/products'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useProductStore = defineStore('productStore', () => {
  const api = useApi()
  const router = useRouter()

  const products = ref<Product[]>([])
  const isLoading = ref<boolean>(false)

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

  return { products, isLoading, getProductList, getProductById }
})
