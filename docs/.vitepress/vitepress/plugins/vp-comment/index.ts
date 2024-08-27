import MarkdownIt from 'markdown-it'

export const vpComment = (md: MarkdownIt) => {
  const html_block = md.renderer.rules.html_block!
  md.renderer.rules.html_block = (tokens, index, options, env, slf) => {
    const token = tokens[index]
    const regx = new RegExp('<!--\\s*(.*?)\\s*-->')
    const [_, info] = token.content.match(regx) || []
    if (!info) return html_block(tokens, index, options, env, slf)
    /** info类似于：'@collapse-start this is info' */
    const regx2 = new RegExp('^@[a-zA-Z0-9\\-]*')
    /** 指令和辅助信息 */
    const [directive] = info.match(regx2) || []
    if (!directive) return html_block(tokens, index, options, env, slf)
    const title = info.replace(directive, '').trim()
    let result = ''
    switch (directive) {
      case '@collapse-start':
        result += `<vp-collapse style="margin: 16px 0;" accordion>\n`
        result += `<vp-collapse-item class="vp-collapse-item" name="${index}">\n`
        if (title) result += `<template #title>${md.render(title)}</template>\n`
        return result
      case '@collapse---':
        result += '</vp-collapse-item>\n'
        result += `<vp-collapse-item class="vp-collapse-item" name="${index}">\n`
        if (title) result += `<template #title>${md.render(title)}</template>\n`
        return result
      case '@collapse-end':
        result += '</vp-collapse-item>\n'
        result += '</vp-collapse>\n'
        return result

      case '@tabs-start':
        result += `<el-tabs style="margin: 16px 0;" type="border-card">\n`
        result += `<el-tab-pane class="vp-tab-item">`
        if (title) result += `<template #label>${md.render(title)}</template>`
        return result
      case '@tabs---':
        result += '</el-tab-pane>\n'
        result += `<el-tab-pane class="vp-tab-item">`
        if (title) result += `<template #label>${md.render(title)}</template>`
        return result
      case '@tabs-end':
        result += '</el-tab-pane>\n'
        result += '</el-tabs>\n'
        return result

      case '@col-start':
        result += `<el-row style="margin-top: 16px; margin-bottom: 16px;" :gutter="20">\n`
        result += `<el-col :span="12">`
        return result
      case '@col---':
        result += '</el-col>\n'
        result += `<el-col :span="12">`
        return result
      case '@col-end':
        result += '</el-col>\n'
        result += '</el-row>\n'
        return result
    }
    return html_block(tokens, index, options, env, slf)
  }
}
