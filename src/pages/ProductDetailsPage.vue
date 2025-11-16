<script lang="ts" setup>
import { useProductStore } from '@/stores/useProductStore'
import { onMounted, ref } from 'vue'
import type { Product } from '../types/products'
import PanelLayout from '@/layouts/PanelLayout.vue'

const { getProductById } = useProductStore()

const product = ref<Product | undefined>(undefined)

onMounted(() => {
  product.value = getProductById(1)
})
</script>

<template>
  <PanelLayout v-if="product" :header="product.name">
    <div class="product-details">
      <p>Category: {{ product.category }}</p>
      <p>Price: ${{ product.price.toFixed(2) }}</p>
      <p>Description: {{ product.description }}</p>
    </div>
  </PanelLayout>
</template>
