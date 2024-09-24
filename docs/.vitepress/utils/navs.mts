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
    text: '错题集',
    activeMatch: '/mistakes',
    link: '/mistakes/home',
  },
  {
    text: '专题集',
    activeMatch: '/subjects',
    link: '/subjects/home',
  },
]

const toolNavs: DefaultTheme.NavItem[] = [
  {
    text: '工具集',
    activeMatch: '/tools/webnav',
    link: '/tools/webnav/frontend',
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
