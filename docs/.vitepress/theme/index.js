import DefaultTheme from 'vitepress/theme'
import CustomLayout from './components/Layout.vue'

import BasicBlock from './components/BasicBlock.vue'
import APITabs from './components/APITabs.vue'

export default {
    ...DefaultTheme,
    Layout: CustomLayout,
    enhanceApp({ app }) {
        DefaultTheme.enhanceApp?.({ app })

        app.component('BasicBlock', BasicBlock)
        app.component('APITabs', APITabs)
    }
}

