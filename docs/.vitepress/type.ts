import { DefaultTheme } from 'vitepress'

export interface ModuleConfig {
  /** 模块名称，用来匹配 */
  name: string
  /**
   * 模块路径，用来做前缀/匹配
   * @alias prefix
   */
  path: string
  /** sidebar */
  sidebar: DefaultTheme.SidebarItem[]
}
