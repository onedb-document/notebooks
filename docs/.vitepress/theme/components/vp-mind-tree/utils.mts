import { Router } from "vitepress"
import { nav, sidebar } from "../../../utils/index.mts"

/** vitepress的nav、sidebar的配置项 */
interface LinkDataItem {
  /** ==> name */
  text?: string
  /** ==> value */
  link?: string
  _id?: string
  /** ==> children */
  items?: LinkDataItem[]
}

/** echarts的Tree的配置项 */
interface MindDataItem {
  name?: string
  value?: string
  children?: MindDataItem[]
  /** 是否折叠 */
  collapsed?: boolean
}

class Utils {
  readonly fullData: MindDataItem[] = []
  readonly rootData: MindDataItem[] = []
  constructor() {
    this.fullData = this.getFullData()
    this.rootData = this.getRootData()
  }

  /** 转换数据，LinkDataItem[] => MindDataItem[] */
  private transform(data: LinkDataItem[] = []): MindDataItem[] {
    if (!data) return []
    const result = data.map(item => {
      return {
        name: item.text,
        value: item.link,
        children: this.transform(item.items),
        collapsed: false,
      }
    })

    return result
  }

  /** 获取从nav开始的脑图数据 */
  private getFullData() {
    function _getFullOriginData(data: LinkDataItem[] = []) {
      return data.map(item => {
        const key = item._id || item.link
        return {
          text: item.text,
          link: item.link || item._id,
          items: key ? sidebar[key] : _getFullOriginData(item.items),
        }
      })
    }
    const originData = _getFullOriginData(nav)
    return this.transform(originData)
  }

  /** 获取从nav开始的脑图数据，并添加“root”节点 */
  private getRootData(): MindDataItem[] {
    return [
      {
        name: "root",
        children: this.getFullData(),
      },
    ]
  }

  /** 获取path对应的脑图数据，根据rootData */
  public getPathData(path: string): MindDataItem[] {
    /** 解码，并且去除末尾的"/" */
    path = window.decodeURIComponent(path).replace(/\/$/, "")
    let result: MindDataItem[] = []
    function find(data: MindDataItem[] = []) {
      data.forEach(item => {
        if (result.length) return
        if (item.value === path) {
          result = [item]
          return
        }
        find(item.children)
      })
    }
    find(this.rootData)
    return result
  }

  public getPath(router: Router) {
    return router.route.path === "/" ? "/" : window.decodeURIComponent(router.route.path).replace(/\/$/, "")
  }

  /** 获取echarts的Tree图表的option定义 */
  public getOption(path: string, { isDark } = { isDark: true }) {
    const data = path === "/" ? this.rootData : this.getPathData(path)

    return {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          type: "tree",
          data,
          top: "7%",
          left: "70px",
          bottom: "7%",
          right: "20%",
          /** 圆点大小 */
          symbolSize: 7,
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 12,
            color: isDark ? "#fff" : "#000",
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
          emphasis: {
            focus: "descendant",
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    }
  }
}

export const utils = new Utils()

export const getElId = (() => {
  let id = 0
  return () => {
    return `mind_tree_${++id}`
  }
})()
