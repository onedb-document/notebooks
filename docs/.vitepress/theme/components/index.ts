import VpDemo from './vp-demo/index.vue'
import VpDemoGroup from './vp-demo-group/index.vue'
import type { Component } from 'vue'
import VpCollapse from './vp-collapse/index.vue'
import VpCollapseItem from './vp-collapse/vp-collapse-item.vue'

export const globalComponents: [string, Component][] = [
  ['VpDemo', VpDemo],
  ['VpDemoGroup', VpDemoGroup],
  ['VpCollapse', VpCollapse],
  ['VpCollapseItem', VpCollapseItem],
]
