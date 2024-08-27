import MarkdownIt from 'markdown-it'
import textual from 'markdown-it-textual-uml'
import footnote from 'markdown-it-footnote'
import { vpMermaid } from './vp-mermaid'
import { vpDemo } from './vp-demo'
import { vpMd } from './vp-md'
import { vpCollapse } from './vp-collapse'
import { vpTabs } from './vp-tabs'
import { vpCol } from './vp-col'
import { fenceUtils } from './utils'
import { vpComment } from './vp-comment'

export const addPlugins = (md: MarkdownIt) => {
  /** 最先调用，缓存下来 */
  fenceUtils.setFn(md.renderer.rules.fence!.bind(md.renderer.rules))
  /** 使用代码块渲染图表（mermaid、plantuml等） */
  md.use(textual)
  md.use(vpMermaid)
  /** 使用代码块vp_md渲染md */
  md.use(vpMd)
  /** 脚注 */
  md.use(footnote)
  /** 容器扩展（折叠面板、标签页、Col、Demo等） */
  md.use(vpCollapse)
  md.use(vpTabs)
  md.use(vpCol)
  md.use(vpDemo)
  /** 使用注释语法支持（折叠面板、标签页、Col）等 */
  md.use(vpComment)
}
