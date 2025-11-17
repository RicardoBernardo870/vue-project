<script setup lang="ts">
import { Dialog } from 'primevue'

type Props = {
  position?: 'bottom' | ''
  header: string
}

const props = defineProps<Props>()

const visible = defineModel<boolean>('visible', { required: true })
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="props.header"
    :position="props.position"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <slot></slot>
  </Dialog>
</template>

<style lang="css">
.p-dialog-content {
  overflow: hidden;
}
</style>
