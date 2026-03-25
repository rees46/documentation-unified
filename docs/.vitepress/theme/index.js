import DefaultTheme from 'vitepress/theme'


import BasicBlock from './components/BasicBlock.vue'
import VariablesBulkMessaging from './components/VariablesBulkMessaging.vue'

export default {
    ...DefaultTheme,

    enhanceApp({ app }) {
        DefaultTheme.enhanceApp?.({ app })

        app.component('BasicBlock', BasicBlock)
        app.component('VariablesBulkMessaging', VariablesBulkMessaging)
    }
}

