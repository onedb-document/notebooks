---
nav:
  title: html&css
  order: 2
toc: menu
order: 1
---

# html&css

## 知识点

- 语义化标签
- css 水平垂直居中
- css 中有哪些单位
- px、em、rem 的区别
- display 可以取哪些值
- href 和 src 的区别
- 三栏布局
- transition 和 animation

## 语义化标签

让标签具有自己的含义。

常见语义化标签：title header footer article hn(h1~h6) main nav strong code 等

好处：

- 代码结构清晰，方便阅读，有利于团队合作开发。
- 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以语义的方式来渲染网页。
- 有利于搜索引擎优化（SEO）。

## css 水平垂直居中

css 的 transform、absolute、margin 还有 flex 以及行内标签的一些属性。

## css 中有哪些单位

px、em、rem、%、vh、vw、vmin、vmax、ex、ch

## px、em、rem 的区别

px 是绝对单位，页面按精确像素展示。

em：相对单位，基准点为父节点字体的大小，如果自身定义了 font-size 按自身来计算（浏览器默认字体是 16px），整个页面内 1em 不是一个固定的值。

rem：相对单位，可理解为”root em”, 相对根节点 html 的字体大小来计算，CSS3 新加属性，chrome/firefox/IE9+支持。

在移动端适配上的应用。

## display 可以取哪些值

inline、block、inline-block、list-item、run-in、none、table、table-row、table-column、table-cell、inherit、table-row-group、table-column-group

## href 和 src 的区别

href：超文本引用。link、a。浏览器会识别 href 引用的文档并行下载该文档，并且不会停止对当前文档的处理。

src：引入。img、script、iframe。src 指向的内容会嵌入到文档中当前标签所在的位置。当浏览器解析到 src 引用时，会暂停浏览器的渲染，直到该资源加载完毕。这也是将 js 脚本放在底部而不是头部的原因。

## 三栏布局

两端宽度固定，中间宽度自适应布局

三种方式实现：

- flex 布局
- float
- position: absolute

## transition 和 animation

Transition：对元素某个属性或多个属性的变化，进行控制(时间等)，类似 flash 的补间动画。但只有两个关键帧。开始，结束。

Animation：对元素某个属性或多个属性的变化，进行控制(时间等)，类似 flash 的补间动画。可以设置多个关键帧。

Transition 与 Animation 区别: transition 需要触发一个事件,而 animation 在不需要触发任何事件的情况下也可以显式的随着时间变化来改变元素 css 的属性值，从而达到一种动画的效果。Transition: transition 属性是一个简单的动画属性，非常简单非常容易用。可以说它是 animation 的简化版本，是给普通做简单网页特效用的。
