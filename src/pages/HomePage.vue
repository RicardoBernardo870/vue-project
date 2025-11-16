<script lang="ts" setup>
import Card from 'primevue/card'
import { Button } from 'primevue'
</script>

<template>
  <div class="main-page">
    <section>
      <Card class="welcome-card">
        <template #title>
          <h1>Home Page</h1>
        </template>

        <template #content>
          <p>Welcome to the home page!</p>
          <p>Explore our products and services.</p>
        </template>

        <template #footer>
          <router-link to="/dashboard">
            <Button class="" label="Check our products" />
          </router-link>
        </template>
      </Card>
    </section>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
  height: 100vh;
}
.welcome-card {
  margin-bottom: 1rem;
  width: 300px;
}
</style>
