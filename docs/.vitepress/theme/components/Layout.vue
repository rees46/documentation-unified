<template>
  <CustomLayout>
    <template #aside-outline-after>
      <div class="right-panel-wrapper">
        <RightActionPanel v-if="ShowIntegrationPanel" />
      </div>
    </template>
  </CustomLayout>
</template>

<style scoped>
.right-panel-wrapper {
  margin-top: -50px;
}
</style>

<script setup>
import DefaultTheme from 'vitepress/theme'
import RightActionPanel from './RightActionPanel.vue'
import { useData } from 'vitepress'
import { computed } from 'vue'

const CustomLayout = DefaultTheme.Layout
const { page } = useData()

const ShowIntegrationPanel = computed(() =>
    page.value.relativePath.startsWith('integration/')
)
</script>
