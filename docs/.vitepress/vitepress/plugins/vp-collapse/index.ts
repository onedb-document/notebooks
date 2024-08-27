import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'

const CONTAINER = 'vp_collapse'
const CONTAINER_ITEM = 'vp_collapse_item'
const regexp_container = new RegExp(`^${CONTAINER}\\s*(\.*)$`)
const regexp_container_item = new RegExp(`^${CONTAINER_ITEM}\\s*(\.*)$`)

export const vpCollapse = (md: MarkdownIt) => {
  /** 渲染el-collapse节点 */
  md.use(mdContainer, CONTAINER, {
    validate(params) {
      return !!params.trim().match(regexp_container) && !params.trim().match(regexp_container_item)
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        let result = `<el-collapse style="margin: 16px 0;" accordion>`
        return result
      } else {
        // closing tag
        return '</el-collapse>\n'
      }
    },
  })

  /** 渲染el-collapse-item节点 */
  md.use(mdContainer, CONTAINER_ITEM, {
    validate(params) {
      return !!params.trim().match(regexp_container_item)
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        const token = tokens[idx]
        const title = token.info.trim().replace(CONTAINER_ITEM, '').trim()
        let result = `<el-collapse-item class="vp-collapse-item" name="${idx}">`
        if (title) result += `<template #title>${md.render(title)}</template>`
        return result
      } else {
        // closing tag
        return '</el-collapse-item>\n'
      }
    },
  })
}
