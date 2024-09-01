import { DefaultTheme } from 'vitepress'

const learningNavs: DefaultTheme.NavItem[] = [
  {
    text: '朝花夕拾',
    activeMatch: '/learning/git',
    items: [
      {
        text: 'git',
        link: '/learning/git/常用命令',
        activeMatch: '/learning/git',
      },
      {
        text: 'js',
        link: '/learning/js/home',
        activeMatch: '/learning/js',
      },
    ],
  },
  {
    text: '他山之石',
    activeMatch: '/advices',
    link: '/advices/home',
  },
  {
    text: '错题集',
    activeMatch: '/mistakes',
    link: '/mistakes/home',
  },
]

const toolNavs: DefaultTheme.NavItem[] = [
  {
    text: '工具',
    activeMatch: '/tools/webnav',
    items: [
      {
        text: '网址导航',
        link: '/tools/webnav/frontend',
        activeMatch: '/tools/webnav',
      },
      {
        text: '内网穿透',
        link: '/tools/frp/home',
        activeMatch: '/tools/frp',
      },
      {
        text: '网络代理',
        link: '/tools/v2ray/home',
        activeMatch: '/tools/v2ray',
      },
      {
        text: '网站部署',
        link: '/tools/netlify/home',
        activeMatch: '/tools/netlify',
      },
      {
        text: '操作系统',
        link: '/tools/windows/home',
        activeMatch: '/tools/windows',
      },
      {
        text: '文档绘图',
        link: '/tools/mermaid/home',
        activeMatch: '/tools/mermaid',
      },
    ],
  },
]

const sharedNavs: DefaultTheme.NavItem[] = [
  {
    text: '分享',
    activeMatch: '/shared',
    link: '/shared/docker-images/home',
    // items: [
    //   {
    //     text: 'docker镜像',
    //     link: '/shared/docker-images/home',
    //     activeMatch: '/shared/docker-images',
    //   },
    //   {
    //     text: '乐谱',
    //     link: '/shared/musicScore/home',
    //     activeMatch: '/shared/musicScore',
    //   },
    // ],
  },
]

/** vitepress的导航栏 */
export const nav: DefaultTheme.NavItem[] = [...learningNavs, ...toolNavs, ...sharedNavs]
