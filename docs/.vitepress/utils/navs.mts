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
    link: '/tools/webnav/frontend',
    activeMatch: '/tools/webnav',
  },
]

const sharedNavs: DefaultTheme.NavItem[] = [
  {
    text: '分享',
    activeMatch: '/shared',
    link: '/shared/docker-images/home',
  },
]

/** vitepress的导航栏 */
export const nav: DefaultTheme.NavItem[] = [...learningNavs, ...toolNavs, ...sharedNavs]
