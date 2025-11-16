<script setup lang="ts">
import { Panel } from 'primevue'

type Props = {
  header?: string
  class?: string
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  header: '',
  class: '',
  width: '100%',
})
</script>

<template>
  <div class="panel-layout">
    <Panel :header="props.header" class="panel-container">
      <template #icons>
        <slot name="icons" />
      </template>
      <TransitionGroup name="fade" tag="div" :class="props.class">
        <slot />
      </TransitionGroup>
    </Panel>
  </div>
</template>

<style lang="css" scoped>
.panel-layout {
  padding: 1rem;
  width: v-bind(width);
  transition: all 0.3s ease-in-out;
}

.panel-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  height: 100%;
  overflow: auto;
  transition: all 0.3s ease-in-out;
}

.panel-container :deep(.p-panel) {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
}

.panel-container :deep(.p-panel-header) {
  flex-shrink: 0;
}

.panel-container :deep(.p-panel-content) {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
