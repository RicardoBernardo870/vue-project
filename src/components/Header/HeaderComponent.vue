<script lang="ts" setup>
import { Toolbar, Button } from 'primevue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const headerTitle = computed(() => {
  const routeName = router.currentRoute.value.name
  switch (routeName) {
    case 'dashboard':
      return 'Dashboard'
    case 'product-details':
      return 'Product Details'
    case 'project-list':
      return 'Project List'
    default:
      return 'Welcome!'
  }
})

const showBackButton = computed(() => {
  return (
    router.currentRoute.value.name !== 'dashboard' &&
    router.currentRoute.value.name !== 'not-found' &&
    router.currentRoute.value.name !== 'home'
  )
})
</script>

<template>
  <Toolbar style="padding: 1rem 1rem 1rem 1.5rem">
    <template #start>
      <RouterLink v-if="showBackButton" class="header-button" to="/dashboard">
        <Button icon="pi pi-arrow-left"></Button>
      </RouterLink>

      <h3>{{ headerTitle }}</h3>
    </template>
  </Toolbar>
</template>

<style scoped>
.header-button {
  margin-right: 1rem;
}
</style>
