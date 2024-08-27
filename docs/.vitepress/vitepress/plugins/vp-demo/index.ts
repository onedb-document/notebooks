import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import { fenceUtils, getParamsByInfo, Token } from '../utils'
import fs from 'fs'
import path from 'path'

const CONTAINER = 'vp_demo'
const DEMO_MARK = 'vp_demo--'
const regexp = new RegExp(`^${CONTAINER}\\s*(\.*)$`)
const markX10 = '``````````'

/** 获取容器中第一个代码块，并打上标记 */
const getFirstFenceTokenInContainer = (tokens: Token[], idx: number) => {
  while (tokens[idx]?.type !== `container_${CONTAINER}_close`) {
    const token = tokens[idx]
    if (token.type === 'fence') {
      token.info = `${DEMO_MARK}${token.info}`
      return token
    }
    idx++
  }
}

/** 使用原fence渲染函数，渲染源代码块 */
const getSourceCodeHtml = ({ tokens, index, options, env, slf }) => {
  const token = tokens[index]
  const newInfo = token.info.trim().replace(DEMO_MARK, '').trim()
  const [newLang] = newInfo.split(' ')
  token.info = newLang
  const sourceCodeHtml = fenceUtils.fn(tokens, index, options, env, slf)
  return sourceCodeHtml
}

/** 屏蔽错误 */
const readFileSync = (filePath: string) => {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch (err) {
    return ''
  }
}

export const vpDemo = (md: MarkdownIt) => {
  
  /** 渲染vp-demo节点 */
  md.use(mdContainer, CONTAINER, {
    validate(params) {
      return !!params.trim().match(regexp)
    },
    render: function (tokens: Token[], idx: number) {
      if (tokens[idx].nesting === 1) {
        // opening tag

        const params = getParamsByInfo(tokens[idx].info)

        /** 如果是从path中引入的，就从文件中获取内容 */
        if (params.path) {
          const filePath = path.resolve(params.path.replace('@', './docs'))
          const fileContent = readFileSync(filePath)

          const demoHtml = md.render(fileContent)
          const sourceCodeHtml = md.render(`${markX10}markdown\n${fileContent}\n${markX10}`)

          let result = `<vp-demo id="vp_demo_${idx}" raw-source="${encodeURIComponent(fileContent)}">`
          result += demoHtml
          result += `<template #sourceCode>${sourceCodeHtml}</template>`
          if (params.description) result += `<template #description>${md.render(params.description)}</template>`
          return result
        }

        const firstFenceToken = getFirstFenceTokenInContainer(tokens, idx)
        let result = `<vp-demo id="vp_demo_${idx}" raw-source="${encodeURIComponent(firstFenceToken?.content || '')}">`
        return result
      } else {
        // closing tag
        return '</vp-demo>\n'
      }
    },
  })

  const fence = md.renderer.rules.fence!.bind(md.renderer.rules)

  /** 渲染代码块，传入插槽 */
  md.renderer.rules.fence = (tokens, index, options, env, slf) => {
    const token = tokens[index]
    const info = token.info.trim()
    if (info.includes(DEMO_MARK)) {
      try {
        const [_lang, description] = info.replace(DEMO_MARK, '').split(' ')
        tokens[index].info = info.replace(DEMO_MARK, '')

        const demoHtml = fence(tokens, index, options, env)
        const sourceCodeHtml = getSourceCodeHtml({ tokens, index, options, env, slf })

        let result = demoHtml
        result += `<template #sourceCode>${sourceCodeHtml}</template>`
        if (description) result += `<template #description>${md.render(description)}</template>`
        return result
      } catch (err) {
        return `<pre>${err}</pre>`
      }
    }
    return fence(tokens, index, options, env)
  }
}
