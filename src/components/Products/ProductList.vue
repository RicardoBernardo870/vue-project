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

const productStore = useProductStore()
const { sortOptions } = useProductOptions()

const { getProductList } = productStore
const { products, isLoading } = storeToRefs(productStore)

const openFilters = ref<boolean>(false)

onMounted(async () => {
  await getProductList()
})
</script>

<template>
  <ProductFilterBar v-show="openFilters" @on-close="openFilters = false" />

  <PanelLayout header="Product List">
    <template #icons>
      <Button
        :icon="openFilters ? 'pi pi-filter-slash' : 'pi pi-filter'"
        @click="openFilters = !openFilters"
      />
      <Select
        class="sort-select"
        :options="sortOptions"
        placeholder="Sort"
        option-label="label"
        option-value="value"
      />
    </template>
    <div v-if="!isLoading && products.length" class="product-grid">
      <ProductCard
        v-for="product in products"
        :id="product.id"
        :key="product.id"
        :name="product.name"
        :price="product.price"
        :category="product.category"
        :description="product.description"
      />
    </div>

    <div v-else-if="isLoading" class="loading-state">
      <ProgressSpinner />
    </div>

    <div v-else class="empty-state">No products found.</div>
  </PanelLayout>
</template>

<style lang="css">
.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
</style>
