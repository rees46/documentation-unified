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
      <div v-if="current" class="drawer">
        <h3>{{ current.title }}</h3>

        <nav class="menu">
          <template v-for="item in current.items" :key="item.text">
            <!-- ГРУППА -->
            <div v-if="item.items" class="group">
              <div class="group-title">{{ item.text }}</div>

              <button
                  v-for="child in item.items"
                  :key="child.link"
                  class="link"
                  :class="{ active: isActive(child.link) }"
                  @click="navigate(child.link)"
              >
                {{ child.text }}
              </button>
            </div>

            <button
                v-else
                class="link"
                :class="{ active: isActive(item.link) }"
                @click="navigate(item.link)"
            >
              {{ item.text }}
            </button>
          </template>
        </nav>
      </div>
    </transition>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import { rightPanels } from '../rightPanel'

const panels = rightPanels
const route = useRoute()
const router = useRouter()

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

const navigate = (link?: string) => {
  if (!link) return
  router.go(link)
  close()
}

const isActive = (link?: string) => {
  if (!link) return false
  return route.path === link || route.path.startsWith(link + '/')
}

watch(
    () => route.path,
    (path) => {
      const matched = panels.find(panel =>
          panel.items?.some(item =>
              item.items
                  ? item.items.some(child => path.startsWith(child.link))
                  : path.startsWith(item.link)
          )
      )

      activePanel.value = matched?.id ?? null
    },
    { immediate: true }
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

.drawer {
  width: 260px;
  padding: 16px;
  background: var(--vp-c-bg);
  overflow-y: auto;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.link {
  background: none;
  border: none;
  text-align: left;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.link.active {
  background: var(--vp-c-brand-soft);
  font-weight: 500;
}

.group {
  margin-top: 12px;
}

.group-title {
  font-size: 12px;
  margin-bottom: 4px;
  color: var(--vp-c-text-2);
}

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
