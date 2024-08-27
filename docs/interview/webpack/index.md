---
nav:
  title: webpack
  order: 4
toc: menu
order: 1
---

# webpack

## 知识点

- webpack 作用，实现原理
- balbel 原理
- plugin 和 loader

## webpack 作用，实现原理

webpack 的理念就是一切皆模块，把一大堆的 css,js 在一个总入口文件 require 引入，剩下的事情，webpack 会自动处理，包括所有模块的前后端依赖关系打包压缩合并成一个 js，公共代码抽离另外生成位 js，某些制定的 js 单独打包。

管理依赖：方便引用第三方模块、让模块更容易复用、避免全局注入导致的冲突、避免重复加载或加载不需要的模块。

合并代码：把各个分散的模块集中打包成大文件，减少 HTTP 的请求链接数，配合 UglifyJS 可以减少、优化代码的体积。

原理：最简单地说，就是分析代码，找到 require、exports、define 等“关键词”，并替换成对应模块的“引用“

## babel 原理

babel 工作分为三大阶段：

- 解析
  - 将代码字符串解析为抽象语法树；
  - 将整个代码分割成语法单元，进而再分析语法单元之间的关系；
  - 这一步会验证语法的正确性，同时由字符串变为对象结构后更有利于精准地分析以及进行代码结构调整。
- 转换
  遍历抽象树，对抽象语法树进行再变换；这一步是 babel 或者其他编译器中最为复杂的过程。
- 生成
  递归变换后的抽象语法树再生成代码字符串。

## plugin 和 loader 的区别

### loader

loader 用于加载某些资源文件。
因为 webpack 只能理解 JavaScript 和 JSON 文件，对于其他资源例如 css，图片，或者其他的语法集，比如 jsx， coffee，是没有办法加载的。 这就需要对应的 loader 将资源转化，加载进来。从字面意思也能看出，loader 是用于加载的，它作用于一个个文件上。

### plugin

plugin 用于扩展 webpack 的功能。

它直接作用于 webpack，扩展了它的功能。当然 loader 也是变相的扩展 webpack，但是它只专注于转化文件（transform）这一个领域。而 plugin 的功能更加的丰富，而不仅局限于资源的加载。
