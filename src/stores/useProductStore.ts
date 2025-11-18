import { defineStore } from 'pinia'
import { productService } from '@/services/productService'
import type { Product } from '../types/products'
import { computed, ref } from 'vue'

export const useProductStore = defineStore('productStore', () => {
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

  const getProductList = async () => {
    if (products.value.length > 0) return

    isLoading.value = true

    try {
      products.value = await productService.getAll()
    } finally {
      isLoading.value = false
    }
  }

  const getProductById = async (id: number) => {
    const cached = products.value.find((p) => p.id === id)
    if (cached) {
      product.value = cached
      return cached
    }

    product.value = await productService.getById(id)
    return product.value
  }

  const editProduct = async (productId: number, updatedProduct: Product) => {
    const prevProducts = [...products.value]

    products.value = products.value.map((p) => (p.id === productId ? updatedProduct : p))
    product.value = updatedProduct

    try {
      const updated = await productService.update(productId, updatedProduct)

      return updated
    } catch (e) {
      products.value = prevProducts
      throw e
    }
  }

  const addNewProduct = async (newProduct: Omit<Product, 'id'>) => {
    const created = await productService.create(newProduct)
    products.value.push(created)
    return created
  }

  const deleteProduct = async (id: number) => {
    const prev = [...products.value]

    products.value = products.value.filter((p) => p.id !== id)

    try {
      await productService.delete(id)
    } catch (e) {
      products.value = prev
      throw e
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
