<script setup lang="ts">
import ProductList from '@/components/Products/ProductList/ProductList.vue'
</script>

<template>
  <section class="dashboard">
    <ProductList />
  </section>
</template>

<style lang="css" scoped>
.dashboard {
  height: 100%;
  overflow: auto;
  display: flex;
  gap: 1rem;
}
</style>
