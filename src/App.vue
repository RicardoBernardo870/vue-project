<script setup lang="ts">
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const routerReady = ref<boolean>(false)

router.isReady().then(() => {
  routerReady.value = true
})

const route = useRoute()
const showHeader = computed(() => route.meta.hideHeader !== true)
</script>

<template>
  <div class="app-container">
    <HeaderComponent v-if="routerReady && showHeader" class="header-fixed" />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
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
}
</style>
