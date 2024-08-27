import MarkdownIt from 'markdown-it'

const FENCE_INFO = 'vp_md'

/**
 * 代码块中的内容实用md.render渲染
 * @example1
 * ```vp_md
 * # 标题
 * ## 二级标题
 * ```
 *
 * @example2
 * ````vp_md
 * ```ts
 * const a = '12344'
 * const b: number = 321
 * ```
 * ````
 */
export const vpMd = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, index, options, env) => {
    const token = tokens[index]
    const info = token.info.trim()
    if (info.startsWith(FENCE_INFO)) {
      const result = md.render(token.content)
      return result
    }

    return fence(tokens, index, options, env)
  }
}
