<script setup lang="ts">
import { Card, Button } from 'primevue'
import type { Product } from '@/types/products'

type Emits = {
  (e: 'delete', id: number): void
}

const props = defineProps<Product>()

const emit = defineEmits<Emits>()
</script>

<template>
  <Card class="product-card">
    <template #title>
      <h3>{{ props.name }}</h3>
    </template>

    <template #content>
      <p>
        <span>Price:</span>
        {{ props.price }}
      </p>
      <p>
        <span>Category:</span>
        {{ props.category }}
      </p>
    </template>

    <template #footer>
      <Button
        icon="pi pi-trash"
        severity="danger"
        size="small"
        :aria-label="`Delete ${props.name}`"
        @click="emit('delete', props.id)"
      />
      <RouterLink :to="`/product/${props.id}`">
        <Button label="View Details" />
      </RouterLink>
    </template>
  </Card>
</template>

<style lang="css" scoped>
.product-card {
  height: 100%;
}
.product-card :deep(.p-card-body) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  p {
    margin: 0.25rem 0;
  }

  span {
    font-weight: bold;
  }

  .p-card-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
