import { defineConfig } from 'vitepress'
import { nav, sidebar } from './utils/index.mts'
import { addPlugins } from './vitepress/plugins'

export default defineConfig({
  title: '吹口琴的喵🐱',
  description: '千里之行，始于足下',
  base: '/notebooks/',
  outDir: `./.vitepress/dist`,
  assetsDir: 'static',
  cleanUrls: true,
  ignoreDeadLinks: true,
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    nav,
    sidebar,
    footer: {
      message: '© 吹口琴的喵',
      copyright:
        '<a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2024124464号-1</a> <span>苏公网安备32092402000207号</span>',
    },
    search: { provider: 'local' },
    outline: { level: [2, 4] },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  markdown: {
    lineNumbers: true,
    toc: { level: [1, 2] },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详情',
    },
    config(md) {
      addPlugins(md)
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
    },
  },
})
