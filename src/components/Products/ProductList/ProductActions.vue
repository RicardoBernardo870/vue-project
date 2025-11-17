<script setup lang="ts">
import { Button, Select } from 'primevue'
import { storeToRefs } from 'pinia'

import { useProductOptions } from '@/composables/useProductOptions'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { useProductStore } from '@/stores/useProductStore'
import { computed } from 'vue'

const productStore = useProductStore()
const { sortBy, selectedCategory } = storeToRefs(productStore)

const { sortOptions } = useProductOptions()
const { isMobileOrTablet, isMobile } = useBreakpoints()

const openModal = defineModel<boolean>('openModal', { required: true })
const openFilters = defineModel<boolean>('openFilters', { required: true })

const filterNumber = computed(() => {
  const categoryCount = selectedCategory.value.length
  const sortCount = sortBy.value && sortBy.value !== '' ? 1 : 0

  if (!isMobileOrTablet.value) return categoryCount

  return categoryCount + sortCount
})
</script>

<template>
  <Button
    :icon="openFilters ? 'pi pi-filter-slash' : 'pi pi-filter'"
    severity="info"
    :badge="filterNumber > 0 ? filterNumber.toString() : undefined"
    :label="isMobileOrTablet ? '' : 'Filters'"
    @click="openFilters = !openFilters"
  />

  <Select
    v-show="!isMobileOrTablet"
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
    :label="isMobile ? '' : 'Add Product'"
    @click="openModal = !openModal"
  />
</template>

<style lang="css" scoped>
.sort-select {
  width: 250px;
  margin-left: 1rem;
}
</style>
