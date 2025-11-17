import { defineStore } from 'pinia'
import useApi from '@/services/api'
import type { Product } from '../types/products'
import { computed, ref } from 'vue'
import { useToast } from 'primevue'
import router from '@/router'

export const useProductStore = defineStore('productStore', () => {
  const api = useApi()
  const toast = useToast()

  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
  const selectedCategory = ref<string[]>([])
  const sortBy = ref<string>('')

  const isLoading = ref<boolean>(true)

  const filteredProducts = computed(() => {
    const productsList = products?.value || []

    if (!selectedCategory.value.length) {
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

  const showToast = (severity: 'success' | 'error', summary: string, detail: string) => {
    toast.add({ severity, summary, detail, life: 3000 })
  }

  const getProductList = async () => {
    try {
      if (products.value.length > 0) return

      isLoading.value = true

      const response = await api.get('/products')

      products.value = response.data as Product[]
    } catch (error) {
      console.error('Error fetching product list:', error)
    } finally {
      isLoading.value = false
    }
  }

  const getProductById = async (id: number) => {
    const cached = products.value.find((p) => p.id === id)
    if (cached) return (product.value = cached)

    try {
      const response = await api.get(`/products/${id}`)
      product.value = response.data
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error)
      showToast('error', 'Error', 'Product not found')

      router.push({ name: 'dashboard' })
      return null
    }
  }

  const editProduct = async (productId: number, updatedProduct: Product) => {
    const prevProducts = [...products.value]

    try {
      products.value = products.value.map((p) => (p.id === productId ? updatedProduct : p))
      product.value = updatedProduct

      await api.patch(`/products/${productId}`, updatedProduct)
      showToast('success', 'Success', 'Product updated successfully')
    } catch (error) {
      products.value = prevProducts

      showToast('error', 'Error', 'Failed to update product')
      throw error
    }
  }

  const addNewProduct = async (newProduct: Product) => {
    try {
      const { data } = await api.post('/products', newProduct)

      products.value.push(data as Product)

      showToast('success', 'Success', 'Product added successfully')
    } catch (error) {
      showToast('error', 'Error', 'Failed to add product')
      throw error
    }
  }

  const deleteProduct = async (id: number) => {
    const prev = products.value
    products.value = prev.filter((p) => p.id !== id)

    try {
      await api.delete(`/products/${id}`)

      showToast('success', 'Delete', 'Product deleted successfully')
    } catch (err) {
      products.value = prev
      throw err
    }
  }

  return {
    products,
    product,
    isLoading,
    sortedProducts,
    selectedCategory,
    sortBy,
    getProductList,
    addNewProduct,
    getProductById,
    deleteProduct,
    editProduct,
  }
})
