import DefaultTheme from 'vitepress/theme'
import BasicBlock from './components/BasicBlock.vue'
import APITabs from './components/APITabs.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('BasicBlock', BasicBlock)
        app.component('APITabs', APITabs)
    }
}
