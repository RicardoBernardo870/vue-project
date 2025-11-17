<script setup lang="ts">
import { Toast } from 'primevue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import HeaderComponent from '@/components/Header/HeaderComponent.vue'

const router = useRouter()
const route = useRoute()
const routerReady = ref<boolean>(false)

router.isReady().then(() => {
  routerReady.value = true
})

const showHeader = computed(() => route.meta.hideHeader !== true)
</script>

<template>
  <div class="app-container">
    <HeaderComponent v-if="routerReady && showHeader" class="header-fixed" />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
  <Toast
    position="bottom-right"
    :breakpoints="{
      '640px': { position: 'top-center', width: '90%' },
      '960px': { position: 'bottom-right', width: 'auto' },
    }"
  />
</template>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header-fixed {
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
}
</style>
