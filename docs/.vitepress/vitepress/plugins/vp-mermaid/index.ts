import MarkdownIt from 'markdown-it'

const FENCE_INFO = 'mermaid'

export const vpMermaid = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, index, options, env) => {
    const token = tokens[index]
    const info = token.info.trim()
    if (info.startsWith(FENCE_INFO)) {
      const result = `<div id="vp-mermaid-${index}" content="${encodeURIComponent(
        token.content,
      )}"><pre id="vp-mermaid-pre-${index}" class="mermaid">${token.content}</pre></div>`
      return result
    }

    return fence(tokens, index, options, env)
  }
}
