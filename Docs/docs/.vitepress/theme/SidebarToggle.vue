<script setup>
import { useSidebar } from 'vitepress/theme'

const { toggle, isOpen } = useSidebar()
</script>

<template>
  <button
    class="sidebar-toggle"
    type="button"
    @click="toggle"
    :data-open="isOpen"
    :aria-label="isOpen ? 'Close sidebar' : 'Open sidebar'"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </button>
</template>
