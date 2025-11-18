<script lang="ts" setup>
import { useProductStore } from '@/stores/useProductStore'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useToast } from 'primevue'

import ProductForm from '@/components/Products/ProductForm/ProductForm.vue'
import PanelLayout from '@/layouts/PanelLayout.vue'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const { product } = storeToRefs(productStore)
const { getProductById } = productStore

onMounted(async () => {
  try {
    await getProductById(Number(route.params.id))
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Product not found', life: 3000 })
    router.push({ name: 'dashboard' })
  }
})
</script>

<template>
  <div class="product-details-page">
    <PanelLayout :header="product?.name">
      <p>Here you can edit the product details.</p>
      <div class="product-details">
        <ProductForm :product="product" mode="edit" />
      </div>
    </PanelLayout>
  </div>
</template>

<style lang="css" scoped>
.product-details-page {
  padding: 1rem;
  width: 60%;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: 100%;
  }
}
.product-details {
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  .text-input {
    margin-bottom: 1rem;
  }
}
</style>
