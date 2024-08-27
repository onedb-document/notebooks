import DefaultTheme from 'vitepress/theme'
import { Theme } from 'vitepress'
import VpLayout from './components/vp-layout/index.vue'
import 'element-plus/dist/index.css'
import { globalComponents } from './components'
import { elementPlus } from '../vitepress/elementPlus'
import './index.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(elementPlus)
    globalComponents.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
  Layout: VpLayout,
}

export default theme
