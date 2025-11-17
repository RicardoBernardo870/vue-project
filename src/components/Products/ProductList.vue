<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import { ProgressSpinner, Select } from 'primevue'
import { useProductOptions } from '@/composables/useProductOptions'
import { storeToRefs } from 'pinia'

import PanelLayout from '@/layouts/PanelLayout.vue'
import ProductFilterBar from './ProductFilterBar.vue'
import Button from 'primevue/button'
import ProductCard from './ProductCard.vue'
import ModalComponent from '../ModalComponent.vue'
import ProductForm from './ProductForm/ProductForm.vue'

const productStore = useProductStore()

const { getProductList, deleteProduct } = productStore
const { sortedProducts, isLoading, sortBy, selectedCategory } = storeToRefs(productStore)

const { sortOptions } = useProductOptions()

const openFilters = ref<boolean>(selectedCategory.value.length > 0)
const openModal = ref<boolean>(false)

const openFilterBar = () => {
  openFilters.value = !openFilters.value
}

onMounted(async () => {
  await getProductList()
})
</script>

<template>
  <ProductFilterBar v-show="openFilters" @on-close="openFilterBar" />

  <PanelLayout header="Product List">
    <template #icons>
      <Button
        :icon="openFilters ? 'pi pi-filter-slash' : 'pi pi-filter'"
        severity="info"
        label="Filters"
        @click="openFilters = !openFilters"
      />

      <Select
        v-model="sortBy"
        class="sort-select"
        show-clear
        :options="sortOptions"
        placeholder="Sort"
        option-label="label"
        option-value="value"
      />

      <Button
        icon="pi pi-plus"
        class="add-product-button"
        label="Add Product"
        @click="openModal = !openModal"
      />
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

  <ModalComponent v-model:visible="openModal">
    <ProductForm mode="create" />
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

.sort-select {
  width: 250px;
  margin-left: 1rem;
}

.add-product-button {
  margin-bottom: 1rem;
  margin-left: 2rem;
}
</style>
