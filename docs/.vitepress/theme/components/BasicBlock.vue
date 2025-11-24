<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  sources: {
    type: Array,
    required: true
  }
})

const slides = ref([])
const current = ref(0)

async function loadMarkdown(src) {
  try {
    const res = await fetch(src)
    if (!res.ok) throw new Error(`Failed to load ${src}`)
    return await res.text()
  } catch (err) {
    console.error(err)
    return `<p style="color:red">Error loading slide: ${src}</p>`
  }
}

onMounted(async () => {
  slides.value = await Promise.all(
      props.sources.map(path => loadMarkdown(path))
  )
})

function next() {
  current.value = (current.value + 1) % slides.value.length
}

function prev() {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
}

function goTo(index) {
  current.value = index
}

// Название текущего слайда без расширения
const currentSlideName = computed(() => {
  const src = props.sources[current.value] || ''
  return src.split('/').pop().replace(/\.md$/i, '')
})
</script>

<template>
  <div v-if="slides.length" class="slider-container">
    <!-- Стрелка влево -->
    <button class="nav left" @click="prev">‹</button>

    <!-- Основной слайдер -->
    <div class="slider-wrapper">
      <div class="slide" v-html="slides[current]"></div>

      <div class="slider-footer">
        <div class="slide-name">{{ currentSlideName }}</div>
        <div class="steps">
          <button
              v-for="(src, index) in props.sources"
              :key="index"
              @click="goTo(index)"
              :class="{ active: index === current }"
          >
            {{ index + 1 }}
          </button>
        </div>
      </div>
    </div>

    <!-- Стрелка вправо -->
    <button class="nav right" @click="next">›</button>
  </div>

  <!-- Условие загрузки -->
  <template v-else>
    <p>Loading slides...</p>
  </template>
</template>

<style scoped>
/* Внешний контейнер, чтобы стрелки не обрезались */
.slider-container {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Отдельный фон для блока стрелок */
  background: var(--vp-c-bg-3, rgba(0,0,0,0.15)); /* более насыщенный фон */
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 1rem 1.5rem; /* внутренние отступы, чтобы стрелки не прилипали к тексту */
}

/* Основной слайдер */
.slider-wrapper {
  flex: 1;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  padding: 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden; /* Ограничиваем только текст и нижнюю панель */
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

/* Слайд с выравниванием по ширине */
.slide :deep(*) {
  color: var(--vp-c-text);
  line-height: 1.6;
  text-align: justify;
}

.slide {
  min-height: 200px;
}

/* Навигационные стрелки вынесены наружу */
.nav {
  background: var(--vp-c-bg, #fff); /* отдельный фон для кружков */
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text);
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
}

.nav:hover {
  background: var(--vp-c-bg-2, rgba(0,0,0,0.25));
  transform: scale(1.1);
}

/* Нижняя панель с названием и шагами */
.slider-footer {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.slide-name {
  font-weight: bold;
  color: var(--vp-c-text);
}

.steps button {
  background: var(--vp-c-bg-3, rgba(0,0,0,0.1));
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin: 0 0.25rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.steps button:hover {
  background: var(--vp-c-bg-2, rgba(0,0,0,0.15));
  transform: scale(1.1);
}

.steps button.active {
  background: var(--vp-c-text);
  color: var(--vp-c-bg);
}
</style>
