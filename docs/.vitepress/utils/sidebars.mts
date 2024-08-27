import { DefaultTheme } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { ModuleConfig } from '../type'

const needMergeModules = [
  ['windows', 'macOS'],
  ['v2ray', 'squid'],
]

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
    console.log('解析结果：', this.modules)
  }

  /** 合并某些模块的sidebar */
  private getMergeSidebar(moduleNames: string[]) {
    const moduleConfigs = moduleNames
      .map(name => this.modules.find(module => module.name === name))
      .filter(Boolean) as ModuleConfig[]

    const newSidebarValues: DefaultTheme.SidebarItem[] = moduleConfigs.map(
      (module, idx) => ({
        text: module.name,
        items: module.sidebar,
        // collapsed: idx !== 0,
        collapsed: true,
      }),
    )

    const mergedSidebars = moduleConfigs.reduce(
      (tmp, item) => ({ [item.path]: newSidebarValues, ...tmp }),
      {} as { [path: string]: DefaultTheme.SidebarItem[] },
    )

    return mergedSidebars
  }

  /** 获取整体的sidebar */
  getMultiSidebar() {
    let sidebar = {}

    this.modules.forEach(item => {
      sidebar = { ...sidebar, [item.path]: item.sidebar }
    })

    needMergeModules
      .map(item => this.getMergeSidebar(item))
      .forEach(item => {
        sidebar = { ...sidebar, ...item }
      })
    return sidebar
  }

  async getSidebar() {
    await this.initModules()
    return this.getMultiSidebar()
  }
}

const moduleManager = new ModuleManager()

export const sidebar = await moduleManager.getSidebar()
