import DefaultTheme from 'vitepress/theme'


import BasicBlock from './components/BasicBlock.vue'
import VariablesBulkMessaging from './components/VariablesBulkMessaging.vue'
import BonusCalculator from './components/BonusCalculator.vue'

export default {
    ...DefaultTheme,

    enhanceApp({ app }) {
        DefaultTheme.enhanceApp?.({ app })

        app.component('BasicBlock', BasicBlock)
        app.component('VariablesBulkMessaging', VariablesBulkMessaging)
        app.component('BonusCalculator', BonusCalculator)
    }
}

