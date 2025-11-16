<script setup lang="ts">
import ProductList from '@/components/Products/ProductList.vue'
</script>

<template>
  <section class="main-content">
    <ProductList />
  </section>
</template>

<style lang="css" scoped>
.main-content {
  height: 100%;
  overflow: auto;
  display: flex;
  gap: 1rem;
}
</style>
