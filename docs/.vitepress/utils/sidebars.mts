import { DefaultTheme } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { ModuleConfig } from '../type'

/** 从文件中获取配置，并进行校验 */
const getModuleConifg = (filePath: string) => {
  const text = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const moduleConfig: ModuleConfig = JSON.parse(text)
  if (!moduleConfig.name) throw new Error(`请补充name字段: ${filePath}`)
  if (!moduleConfig.path) throw new Error(`请补充path字段: ${filePath}`)
  if (!moduleConfig.sidebar) throw new Error(`请补充sidebar字段: ${filePath}`)
  return moduleConfig
}

/** 转换配置，前缀的逻辑等等 */
const transformModuleConifg = (moduleConfig: ModuleConfig) => {
  const prefix = moduleConfig.path
  const _transformSidebarItem = (sidebarItems: DefaultTheme.SidebarItem[]) => {
    sidebarItems.forEach(sidebarItem => {
      if (sidebarItem.link) {
        sidebarItem.link = `${prefix}${sidebarItem.link}`
      }
      if (sidebarItem.items) {
        _transformSidebarItem(sidebarItem.items)
      }
    })
  }

  _transformSidebarItem(moduleConfig.sidebar)

  return moduleConfig
}

/** 寻找dirName文件夹下所有的名称为targetFileName的文件 */
function getFiles(targetFileName: string, dirName: string) {
  const filePaths: string[] = []
  const fileNames = fs.readdirSync(dirName)

  fileNames.forEach(_fileName => {
    const _filePath = path.join(dirName, _fileName)
    const _stats = fs.statSync(_filePath)
    if (_stats.isDirectory()) {
      filePaths.push(...getFiles(targetFileName, _filePath))
    } else if (_fileName === targetFileName) {
      filePaths.push(_filePath)
    }
  })

  return filePaths
}

class ModuleManager {
  modules: ModuleConfig[] = []

  /** 获取模块原始数据 */
  async initModules() {
    const files = getFiles('module.json', path.resolve('docs'))
    console.log('获取到如下模块配置：', getFiles('module.json', path.resolve('docs')))

    this.modules = files
      .map(path => getModuleConifg(path))
      .map(moduleConfig => transformModuleConifg(moduleConfig))
  }

  /** 根据模块name生成sidebar */
  private genSingleSidebar(
    moduleName: string,
    config: DefaultTheme.SidebarItem = {},
  ): DefaultTheme.SidebarItem {
    const module = this.modules.find(module => module.name === moduleName)
    return {
      ...config,
      text: config.text ?? module?.name,
      items: module?.sidebar,
    }
  }

  private genMultiSidebar(moduleNames: string[]): DefaultTheme.SidebarMulti {
    const multiSidebar = moduleNames
      .map(name => this.modules.find(module => name === module.name))
      .filter(Boolean)
      .reduce((tmp, item) => ({ ...tmp, [item?.path ?? '']: item?.sidebar }), {})

    return multiSidebar
  }

  async getSidebar(): Promise<DefaultTheme.Sidebar> {
    await this.initModules()
    return {
      ...this.genMultiSidebar(['git', 'js', 'mistakes', 'shared', 'subjects']),
      ['/tools/']: [
        this.genSingleSidebar('webnav', { text: '网址导航' }),
        {
          text: '内网穿透',
          collapsed: true,
          items: [this.genSingleSidebar('frp')],
        },
        {
          text: '网络代理',
          collapsed: true,
          items: [this.genSingleSidebar('v2ray'), this.genSingleSidebar('squid')],
        },
        {
          text: '网站部署',
          collapsed: true,
          items: [this.genSingleSidebar('netlify'), this.genSingleSidebar('nginx')],
        },
        this.genSingleSidebar('system-operation', {
          text: '系统操作',
          collapsed: true,
        }),
      ],
    }
  }
}

const moduleManager = new ModuleManager()

export const sidebar = await moduleManager.getSidebar()

// console.log('sidebar', JSON.stringify(sidebar, null, 2))
console.log('sidebar', JSON.stringify(sidebar))
