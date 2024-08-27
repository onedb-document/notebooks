import MarkdownIt from 'markdown-it'

type Tokens = Parameters<Exclude<MarkdownIt['renderer']['rules']['fence'], undefined>>[0]

type ArrayItem<T> = T extends (infer P)[] ? P : never

export type Token = ArrayItem<Tokens>

export type RenderRule = Exclude<MarkdownIt['renderer']['rules']['fence'], undefined>

export const fenceUtils = {
  fn: null as unknown as RenderRule,
  setFn(fn: any) {
    fenceUtils.fn = fn
  },
}

/**
 * 从container的info中解析出配置信息，返回配置对象
 * @example
 * path="/path/to/aaa.md"   =>   { path: "/path/to/aaa.md" }
 */
export const getParamsByInfo = (info: string) => {
  const configs = info
    .split(' ')
    .map(item => item.split('='))
    .filter(item => item.length === 2)
  const params: Record<string, string> = configs.reduce(
    (tmp, item) => ({ ...tmp, [item[0]]: item[1].replace(/"/g, '') }),
    {},
  )
  return params
}
