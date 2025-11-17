<script setup lang="ts">
import { useProductOptions } from '@/composables/useProductOptions'
import { useProductStore } from '@/stores/useProductStore'
import { Select, Checkbox } from 'primevue'
import { storeToRefs } from 'pinia'

import ModalComponent from '../../ModalComponent.vue'

type Props = {
  position?: 'bottom' | ''
}

const props = defineProps<Props>()

const visible = defineModel<boolean>('visible', { required: true })

const productStore = useProductStore()

const { categoryOptions, sortOptions } = useProductOptions()
const { selectedCategory, sortBy } = storeToRefs(productStore)
</script>

<template>
  <ModalComponent v-model:visible="visible" :position="props.position" header="Filters">
    <div class="mobile-filters">
      <label for="category-select">Categories:</label>
      <div
        v-for="category of categoryOptions"
        id="category-select"
        :key="category.value"
        class="checkbox-options"
      >
        <Checkbox
          v-model="selectedCategory"
          :inputId="category.value"
          name="category"
          :value="category.value"
        />
        <label :for="category.value">{{ category.label }}</label>
      </div>

      <Select
        v-model="sortBy"
        class="sort-select"
        show-clear
        :options="sortOptions"
        placeholder="Sort"
        option-label="label"
        option-value="value"
      />
    </div>
  </ModalComponent>
</template>

<style lang="css" scoped>
.mobile-filters {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  .checkbox-options {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    label {
      margin-left: 0.5rem;
    }
  }

  .sort-select {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
