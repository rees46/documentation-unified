<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => []
  }
})

const activeIndex = ref(0)
const content = ref('Выберите вкладку')
const loadedContent = ref({})
const isClient = ref(false)
const { site } = useData()

const safeTabs = Array.isArray(props.tabs) ? props.tabs : []

async function loadMarkdown(path) {
  if (loadedContent.value[path]) {
    return loadedContent.value[path]
  }

  try {
    const base = site.value.base || '/'
    const cleanPath = path.replace(/^\//, '')
    const fullPath = `${base}${cleanPath}`

    const res = await fetch(fullPath)

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    const text = await res.text()

    if (text.includes('<!DOCTYPE') || text.includes('<html')) {
      throw new Error('Server returned HTML instead of markdown')
    }

    loadedContent.value[path] = text
    return text

  } catch (err) {
    console.error('Error loading markdown:', err)
    return `# Ошибка загрузки\n\nНе удалось загрузить файл: ${path}\n\n${err.message}`
  }
}

async function updateContent() {
  const tab = safeTabs[activeIndex.value]
  if (!tab) {
    content.value = 'Вкладка не найдена'
    return
  }

  content.value = 'Загрузка...'
  const text = await loadMarkdown(tab.source)
  content.value = text // Просто сохраняем текст, без рендеринга
}

onMounted(() => {
  isClient.value = true
  if (safeTabs.length > 0) {
    updateContent()

    safeTabs.forEach((tab, index) => {
      if (index !== activeIndex.value) {
        loadMarkdown(tab.source)
      }
    })
  }
})

watch(activeIndex, () => {
  if (isClient.value && safeTabs.length > 0) {
    updateContent()
  }
})
</script>

<template>
  <div class="api-tabs">
    <div class="tab-buttons">
      <button
          v-for="(tab, i) in tabs"
          :key="tab.label"
          :class="['tab-btn', { active: i === activeIndex }]"
          @click="activeIndex = i"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content" v-html="content" />
  </div>
</template>

<style scoped>
.api-tabs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tab-buttons {
  display: flex;
  gap: 0.5rem;
}

.tab-btn {
  padding: 6px 12px;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.tab-btn.active {
  background: #fff;
  font-weight: bold;
  border-color: #888;
}

.tab-content {
  padding: 1rem;
  border-radius: 6px;
  background: #fafafa;
  border: 1px solid #eee;
}
</style>
