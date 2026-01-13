import DefaultTheme from 'vitepress/theme'


import BasicBlock from './components/BasicBlock.vue'

export default {
    ...DefaultTheme,

    enhanceApp({ app }) {
        DefaultTheme.enhanceApp?.({ app })

        app.component('BasicBlock', BasicBlock)
    }
}

