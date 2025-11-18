<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import { ProgressSpinner, useToast } from 'primevue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { storeToRefs } from 'pinia'

import PanelLayout from '@/layouts/PanelLayout.vue'
import ProductFilterBar from './ProductFilterBar.vue'
import ProductCard from './ProductCard.vue'
import ModalComponent from '../../ModalComponent.vue'
import ProductForm from '../ProductForm/ProductForm.vue'
import ProductActions from './ProductActions.vue'
import ProductFilterMobile from './ProductFilterMobile.vue'

const productStore = useProductStore()
const toast = useToast()

const { getProductList, deleteProduct: deleteProductFromStore } = productStore
const { sortedProducts, isLoading } = storeToRefs(productStore)
const { isMobileOrTablet } = useBreakpoints()

const openFilters = ref<boolean>(false)
const openModal = ref<boolean>(false)

const deleteProduct = async (id: number) => {
  try {
    await deleteProductFromStore(id)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product deleted successfully',
      life: 3000,
    })
  } catch (error) {
    console.error('Failed to delete product:', error)

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete product',
      life: 3000,
    })
  }
}

const openFilterBar = () => {
  openFilters.value = !openFilters.value
}

onMounted(async () => {
  await getProductList()
})
</script>

<template>
  <ProductFilterBar v-show="openFilters && !isMobileOrTablet" @on-close="openFilterBar" />

  <ProductFilterMobile v-if="isMobileOrTablet" v-model:visible="openFilters" position="bottom" />

  <PanelLayout header="Product List">
    <template #icons>
      <ProductActions v-model:openModal="openModal" v-model:openFilters="openFilters" />
    </template>

    <div v-if="!isLoading && sortedProducts.length" class="product-grid">
      <ProductCard
        v-for="product in sortedProducts"
        :id="product.id"
        :key="product.id"
        :name="product.name"
        :price="product.price"
        :category="product.category"
        :description="product.description"
        @delete="deleteProduct($event)"
      />
    </div>

    <div v-else-if="isLoading" class="loading-state">
      <ProgressSpinner />
    </div>

    <div v-else class="empty-state">No products found.</div>
  </PanelLayout>

  <ModalComponent v-model:visible="openModal" header="Add Product">
    <ProductForm mode="create" @success="openModal = false" />
  </ModalComponent>
</template>

<style lang="css">
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.loading-state,
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-product-button {
  margin-bottom: 1rem;
  margin-left: 2rem;
}
</style>
