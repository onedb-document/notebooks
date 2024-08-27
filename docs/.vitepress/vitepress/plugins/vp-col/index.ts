import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'

const CONTAINER = 'vp_col'
const CONTAINER_ITEM = 'vp_col_item'
const regexp_container = new RegExp(`^${CONTAINER}\\s*(\.*)$`)
const regexp_container_item = new RegExp(`^${CONTAINER_ITEM}\\s*(\.*)$`)

export const vpCol = (md: MarkdownIt) => {
  /** 渲染el-row节点 */
  md.use(mdContainer, CONTAINER, {
    validate(params) {
      return !!params.trim().match(regexp_container) && !params.trim().match(regexp_container_item)
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        let result = `<el-row style="margin-top: 16px; margin-bottom: 16px;" :gutter="20">`
        return result
      } else {
        // closing tag
        return '</el-row>\n'
      }
    },
  })

  /** 渲染el-col节点 */
  md.use(mdContainer, CONTAINER_ITEM, {
    validate(params) {
      return !!params.trim().match(regexp_container_item)
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        let result = `<el-col :span="12">`
        return result
      } else {
        // closing tag
        return '</el-col>\n'
      }
    },
  })
}
