<template>
  <aside class="right-panel">
    <div class="buttons">
      <button
          v-for="panel in panels"
          :key="panel.id"
          :class="{ active: activePanel === panel.id }"
          @click="toggle(panel.id)"
      >
        {{ panel.buttonLabel }}
      </button>
    </div>

    <transition name="slide">
      <div
          v-if="current"
          class="drawer"
      >
        <h3>{{ current.title }}</h3>

        <ul>
          <li
              v-for="item in current.items"
              :key="item.link"
          >
            <a
                :href="item.link"
                @click="close"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { rightPanels } from '../rightPanel.js'

const panels = rightPanels
const activePanel = ref<string | null>(null)

const toggle = (id: string) => {
  activePanel.value = activePanel.value === id ? null : id
}

const close = () => {
  activePanel.value = null
}

const current = computed(() =>
    panels.find(p => p.id === activePanel.value)
)
</script>

<style scoped>
.right-panel {
  position: sticky;
  top: var(--vp-nav-height);
  height: calc(100vh - var(--vp-nav-height));
  min-width: 120px;
  display: flex;
  border-left: 1px solid var(--vp-c-divider);
}

/* КНОПКИ */
.buttons {
  width: 56px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  background: var(--vp-c-bg-soft);
}

.buttons button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
}

.buttons button.active {
  background: var(--vp-c-brand-soft);
}

/* DRAWER */
.drawer {
  width: 260px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.drawer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* АНИМАЦИЯ */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease, opacity 0.2s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
