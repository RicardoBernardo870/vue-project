<script setup lang="ts">
import Card from 'primevue/card'
import { useProductOptions } from '@/composables/useProductOptions'
import { Button, Checkbox } from 'primevue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/useProductStore'

type Emits = {
  (e: 'onClose'): void
}

const emit = defineEmits<Emits>()

const productStore = useProductStore()

const { categoryOptions } = useProductOptions()
const { resetFilters } = productStore
const { selectedCategory } = storeToRefs(productStore)

const closeFilterBar = () => {
  emit('onClose')
  resetFilters()
}
</script>

<template>
  <Transition name="slide-fade">
    <Card class="filters-card">
      <template #title>
        <Button
          fluid
          icon="pi pi-times"
          severity="secondary"
          class="close-button"
          @click="closeFilterBar"
        />
        <h3>Filters</h3>
      </template>

      <template #content>
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
      </template>
    </Card>
  </Transition>
</template>

<style lang="css" scoped>
.filters-card {
  width: 20%;
  margin-top: 1rem;

  .close-button {
    float: right;
  }

  .checkbox-options {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 10px;
  }

  h3 {
    margin-top: 50px;
  }
}

.category-select {
  width: 100%;
  margin-top: 0.5rem;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-500px);
  opacity: 0;
}
</style>
