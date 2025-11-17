<script setup lang="ts">
import { Dialog } from 'primevue'

const visible = defineModel<boolean>('visible', { required: true })
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Header"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <slot></slot>
  </Dialog>
</template>
