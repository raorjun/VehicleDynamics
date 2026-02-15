<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, ref, watch } from 'vue'

const storageKey = 'vp-sidebar-hidden'
const isHidden = ref(false)

const applyClass = (hidden) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('sidebar-hidden', hidden)
}

const toggle = () => {
  isHidden.value = !isHidden.value
}

onMounted(() => {
  try {
    const stored = localStorage.getItem(storageKey)
    isHidden.value = stored === '1'
  } catch {
    isHidden.value = false
  }
  applyClass(isHidden.value)
})

watch(isHidden, (hidden) => {
  applyClass(hidden)
  try {
    localStorage.setItem(storageKey, hidden ? '1' : '0')
  } catch {
    // ignore storage errors
  }
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <button
        class="sidebar-visibility-toggle"
        type="button"
        :aria-pressed="isHidden"
        :aria-label="isHidden ? 'Show sidebar' : 'Hide sidebar'"
        @click="toggle"
      >
        <svg
          class="sidebar-visibility-toggle__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="7" height="16" rx="1" />
          <line x1="14" y1="8" x2="21" y2="8" />
          <line x1="14" y1="12" x2="21" y2="12" />
          <line x1="14" y1="16" x2="21" y2="16" />
        </svg>
        <span class="sidebar-visibility-toggle__text">
          {{ isHidden ? 'Show sidebar' : 'Hide sidebar' }}
        </span>
      </button>
    </template>
  </DefaultTheme.Layout>
</template>
