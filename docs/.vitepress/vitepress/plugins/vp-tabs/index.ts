import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'

const CONTAINER = 'vp_tab'
const CONTAINER_ITEM = 'vp_tab_item'
const regexp_container = new RegExp(`^${CONTAINER}\\s*(\.*)$`)
const regexp_container_item = new RegExp(`^${CONTAINER_ITEM}\\s*(\.*)$`)

export const vpTabs = (md: MarkdownIt) => {
  /** 渲染el-tabs节点 */
  md.use(mdContainer, CONTAINER, {
    validate(params) {
      return !!params.trim().match(regexp_container) && !params.trim().match(regexp_container_item)
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        let result = `<el-tabs style="margin: 16px 0;" type="border-card">`
        return result
      } else {
        // closing tag
        return '</el-tabs>\n'
      }
    },
  })

  /** 渲染el-tab-pane节点 */
  md.use(mdContainer, CONTAINER_ITEM, {
    validate(params) {
      return !!params.trim().match(regexp_container_item)
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        const token = tokens[idx]
        const title = token.info.trim().replace(CONTAINER_ITEM, '').trim()
        let result = `<el-tab-pane class="vp-tab-item">`
        if (title) result += `<template #label>${md.render(title)}</template>`
        return result
      } else {
        // closing tag
        return '</el-tab-pane>\n'
      }
    },
  })
}
