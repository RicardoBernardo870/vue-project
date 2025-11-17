<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Button } from 'primevue'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Button class="home-link" severity="info" @click="router.back()">Go back</Button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 2rem;
  text-align: center;
}

.content h1 {
  font-size: 6rem;
  margin: 0;
  line-height: 1;
}

.content p {
  font-size: 1.25rem;
  margin: 0.5rem 0 1.5rem;
  color: #555;
}
</style>
