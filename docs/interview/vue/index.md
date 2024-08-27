---
nav:
  title: vue
  order: 7
toc: menu
order: 1
---

# vue

## 知识点

- vue 介绍
- vue 和 react 的区别
- computed 和 watch 有什么区别
- vue 生命周期
- 数据双向绑定（响应式原理）
- vue 数组的更新方式
- vue 虚拟 DOM 和 diff 算法
- 模板是怎么解析的
- vue 路由的实现原理
- Vue3 的新特性

## vue 介绍

MVVM 框架、数据双向绑定、轻量、渐进式框架、易上手、运行速度快。

不支持 IE8 及以下版本，不利于 SEO，不适合大型项目开发。

## vue 和 react 的区别

- 运行，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。vue 组件的依赖会在渲染过程中自动追踪。这使 vue 的开发者不用在开发时手动避免不必要的子组件的渲染。
- html&css，在 React 中，一切都是 JavaScript。而 Vue 的整体思想是拥抱经典的 Web 技术，并在其上扩展。
- 写法，react 是类式的写法，api 很少。与 typeScript 结合的更好。vue 是声明式写法，通过传入各种 options，api 和参数都很多。

## computed 和 watch 有什么区别

- 功能上：computed 是计算属性，watch 是监听一个值的变化，然后执行对应的回调。
- 是否调用缓存：computed 中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而 watch 在每次监听的值发生变化的时候都会执行回调。
- 是否调用 return：computed 中的函数必须要用 return 返回，watch 中的函数不是必须要用 return。

## vue 生命周期

生命周期钩子函数：beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed。

keepalive 的组件：activated 和 deactivated

## 数据双向绑定（响应式原理）

vue 的数据双向绑定是通过数据劫持+观察者模式实现的。

通过重写 Object.defineProperty()的 get 和 set 属性实现数据劫持。当数据发生改变时会触发 set 方法，只要将一些需要更新的方法放进去就可以实现 data 更新 view。

Object.defineProperty()只能将对象的属性改为 getter/setter，而无法实现数组的双向绑定。

## vue 数组的更新方式

vue 内部实现了一组观察数组的变异方法，如 push，pop，shift，unshift，splice，sort，reverse 其内部使用了数组的属性来实现数据的双向绑定。

## vue 虚拟 DOM 和 diff 算法

### 虚拟 DOM

js 在操作真实 DOM 时的代价是很大的。每当 js 操作 DOM 时，浏览器都会从头开始重新解析 HTML 文档。

为了解决浏览器的性能问题，虚拟 DOM 就被设计了出来。虚拟 DOM 是将真实的 DOM 的数据抽取出来，以对象的形式模拟树形结构。

页面的更新先全部反映在 js 对象（虚拟 DOM）上，等更新完成之后，再将最终的虚拟 DOM 映射成真实的 DOM，然后在由浏览器渲染。而操作内存中的 js 对象会比操作 DOM 快得多。

可以看到，虚拟 DOM 其实只是实现了一个中间存储的作用，最终的更新还是要通过真实 DOM 实现。这样看似麻烦，其实很大程度上提高了运行速度。

### diff 算法

参考：[解析 vue2.0 的 diff 算法](https://segmentfault.com/a/1190000008782928)

当数据发生改变时，set 方法会让调用 Dep.notify 通知所有订阅者 Watcher，订阅者就会调用 patch 给真实的 DOM 打补丁，更新相应的视图。

diff 的过程就是调用名为 patch 的函数，比较新旧节点，一边比较一边给真实的 DOM 打补丁。

diff 算法的主要作用就是比较两棵树的结构差异并进行转换。

传统 diff 算法会循环递归每一个节点，寻找差异并进行转换，最终的算法复杂度为 O(n^3)。

vue 的 diff 只进行同层级比较，忽略跨级操作，且对比的都是虚拟 DOM 节点。

我们先根据真实 DOM 生成一颗 virtual DOM，当 virtual DOM 某个节点的数据改变后会生成一个新的 Vnode，然后 Vnode 和 oldVnode 作对比，发现有不一样的地方就直接修改在真实的 DOM 上，然后使 oldVnode 的值为 Vnode。

## 模板是怎么解析的

我们知道，模板中有 v-for、v-if、@click 之类的逻辑，因此模板最终当然会转换成 js 代码。实际上，模板最终会转换成 render 函数，这个函数会返回一个 vnode 对象，之后这个对象在 update 函数中被渲染成 html。

## vue 路由的实现原理

本质上是监听 URL 的变化，然后匹配路由规则显示相应页面，这期间无需刷新。

### hash 模式（地址栏带有#）

点击或浏览器历史跳转时，触发 onhashchange 事件,然后根据路由规则匹配显示相应页面(遍历路由表，装载相应组件到 router-link)。

手动刷新时,不会像服务器发送请求（不会触发 onhashchange），触发 onload 事件，然后根据路由规则匹配显示相应页面。

### history 模式

跳转时会调用 history.pushState 方法,根据 to 属性改变地址，并切换相应组件到 router-link。

浏览器历史操作（前进，后退）,只会改变地址栏（页面内容不会变）,不会切换组件，需要使用 popstate 方法来切换组件。

手动刷新,需要后端配合重定向，不然 404。

## Vue3 的新特性

- diff 不再遍历，采用 patch-flag
- 双向绑定 es6 的 Proxy:直接监听 data 的所有域值
- 添加事件缓存
- ssrRender —— push 字符串
- Tree-shaking 没有使用到的属性会被 tree shake 掉
- composition API （不再使用 mixin）
- fragments 不需要有一个根节点
- 静态节点 staticVnode
- async setup() 异步组件
- Custom Renderer API 自定义渲染组件
