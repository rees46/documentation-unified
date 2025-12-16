<template>
  <CustomLayout>
    <template #aside-outline-after>
      <RightActionPanel />
    </template>
  </CustomLayout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import RightActionPanel from './RightActionPanel.vue'

const CustomLayout = DefaultTheme.Layout
</script>
