<script setup lang="ts">
import { ref, provide } from 'vue'

const active = ref('overview')
provide('activeTab', active)
</script>

<template>
  <div class="api-tabs">
    <div class="tab-buttons">
      <button
          v-for="tab in [
          ['overview','Overview'],
          ['curl','cURL'],
          ['javascript','JavaScript'],
          ['ios','iOS'],
          ['android-kotlin','Android Kotlin'],
          ['android-java','Android Java'],
          ['react-native','React Native'],
        ]"
          :key="tab[0]"
          :class="{ active: active === tab[0] }"
          @click="active = tab[0]"
      >
        {{ tab[1] }}
      </button>
    </div>

    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tab-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
button {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
button.active {
  background: var(--vp-c-brand-soft);
}
</style>
