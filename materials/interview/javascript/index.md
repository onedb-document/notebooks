---
nav:
  title: javascript
  order: 1
toc: menu
order: 1
---

# javascript

## 知识点

- js 为什么是单线程，有什么好处？
- js 异步加载的方式
- Microtasks、Macrotasks（事件循环 event loop、任务队列 task queues）
- 原型和原型链
- 继承
- prototype 和\_\_proto\_\_的关系
- typeof 和 instanceof
- 堆内存和栈内存
- 什么是事件委托（事件代理），事件委托有哪些优点？
- 作用域、作用域链
- 提升
- 闭包
- this 指向
- bind、call 和 apply
- 深拷贝和浅拷贝，实现深拷贝
- 函数的防抖和节流
- 冒泡和捕获
- 原生 Ajax
- 模块化

## js 为什么是单线程，有什么好处？

js 最初被设计用在浏览器中，假如 js 是多线程的，当第一个线程上的 js 与第二个线程上的 js 同时对一个 dom 进行操作时，这个 dom 就不知道该执行哪个线程上的指令。

## js 异步加载的方式

- 使用 async 属性
- 使用 defer 属性
- onload 时动态添加 script 标签

## Microtasks、Macrotasks（事件循环 event loop、任务队列 task queues）

常见 macro-task：整体的 script、setTimeout、setInterval

常见 micro-task：promise、process.nextTick

js 通过事件循环实现异步，具体过程为：
执行一个宏任务,过程中如果遇到微任务,就将其放到微任务的事件队列里，当前宏任务执行完成后,会查看微任务的事件队列,并将里面全部的微任务依次执行完。然后在执行一个宏任务，这样一直循环下去。

## 原型和原型链

### 构造函数、原型、实例的关系

构造函数中有一个 prototype 指针指向原型，原型中也有一个 constructor 指针指向构造函数。实例中有一个内部属性**proto**指向原型。构造函数和实例间通过原型产生联系，他们本身没有直接的关联。

### new 的基本原理（当 let fun = new Fun（）时发生了什么？）

- 在构造函数内部声明了一个对象
- 将构造函数的作用域赋给这个对象（obj.**proto** = Fun.prototype）
- 执行构造函数（给对象添加属性）
- 返回这个对象

## 继承

我们在查找一个对象的属性时，如果在对象本身身上没有找到，js 就会沿着这个对象的原型链继续向上查找，直到找到这个属性。那如果一直查到了最顶部（最顶部对象的原型为 null）都没有找到，就说明这个对象上没有这个属性。因此我们可以用继承来实现属性和函数的共享。

## prototype 和\_\_proto\_\_的关系

所有的对象都拥有**proto**属性，它指向构造函数的 prototype 原型对象，最后指向 Object.prototype(Object 是一个原生函数，所有的对象都是 Object 的实例)。

所有的函数都同时拥有**proto**和 prototype 属性，函数的**proto**指向自己的函数实现，函数的 prototype 是一个对象，所以函数的 prototype 也有**proto**属性，指向 Object.prototype。

Object.prototype.**proto**指向 null（原型链的终点指向 null）。

## typeof 和 instanceof

typeof 用于检测基本类型，当他检测引用类型 array 和 object 时，得到的都是“object”。因此，我们需要 instanceof。

instanceof 用于检测引用类型，它可以区分出 array 和 object。其内部是通过原型链来实现的，比如 arr1 instanceof Array ，他会在 arr1 的原型链上查找，这里只查找一层，arr1.**proto** == Array.prototype，返回 true。

Object.prototype.toString.call()

## 堆内存和栈内存

栈内存：存放基本数据类型 String、Number、undefined、Boolean、null

堆内存：存放引用类型 Object、Array、Function、Date、RegExp、包装类型（Boolean、Number、String）

这个可以跟深拷贝联系一下~

## 什么是事件委托（事件代理），事件委托有哪些优点？

事件委托就是将事件绑定到父元素上，根据事件的冒泡，当子元素处理事件时会自动触发父元素的事件。通过判断事件对象 event 的 target 可以找到时间实际发生的子元素。

优点：提高性能、动态监听。提高性能是因为减少了事件监听的数量，动态监听是指当增加一个子元素时，该子元素自动拥有父级元素上绑定的事件。

举例：最经典的就是 ul 和 li 标签的事件监听，比如我们在添加事件时候，采用事件委托机制，不会在 li 标签上直接添加，而是在 ul 父元素上添加。

## 作用域、作用域链

js 没有块作用域，只有函数作用域。函数内部的函数可以访问到外函数中的变量，他们都可以访问到全局作用域中的变量，全局执行环境的变量对象始终是作用域链中的最后一个对象。

es6 中的 let、const 可以达到块级作用域的效果。

## 提升

js 存在变量提升。变量提升包括函数声明提升和变量声明提升，函数声明提升优先于变量声明提升，函数表达式不提升。

## 闭包

### 定义

一个持有外部环境变量的函数就是闭包。

### 哪些地方用到了闭包？

回调函数、私有属性、柯里化

### 闭包的缺陷

内存泄漏，博客：[关于 JavaScript 的内存泄漏](https://blog.csdn.net/qq_42532128/article/details/105019459)

## this 指向

普通函数，this 指向调用它的对象

箭头函数，this 指向上下文对象

当 this 指向全局对象时也可能引起内存泄漏。

## bind、call 和 apply

相同点：都可以改变 this 指向

区别：

- bind 不调用函数，返回一个新的函数，只有一个参数，指明 this 的指向
- call 会直接调用函数，call 只有一个参数，指明 this 的指向
- apply 有两个参数，第二个参数一般为数组，apply 将数组展开传给函数

## 深拷贝和浅拷贝，实现深拷贝

浅拷贝和深拷贝都只针对于引用数据类型，浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，所以当一个对象发生变化时，另一个对象随之改变；

深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象；

区别：浅拷贝只复制对象的第一层属性、深拷贝可以对对象的属性进行递归复制；

第一种，递归实现：
第二种，用 json 的内置方法：`JSON.parse(JSON.stringify(source))`

## 函数的防抖和节流

目的：防止在事件持续触发的过程中频繁执行函数。

防抖，指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。防抖函数分为非立即执行版和立即执行版。

节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。

## 冒泡和捕获

冒泡是从内向外，捕获是从外向内。

冒泡一般会在讲事件委托的时候提到。

## 原生 Ajax

## 模块化

### CommonJs

用于后端 node 和前端 webpack

接口：module.exports 和 require

特点：

1. 模块输出的是一个值的拷贝，模块是运行时加载，同步加载
2. CommonJS 模块的顶层 this 指向当前模块
   AMD（Asynchronous Module Definition，异步模块定义）
   浏览器端模块化开发的规范，require.js 为 AMD 规范的实现
   接口：define、require、config
   特点：异步加载，不阻塞页面的加载，能并行加载多个模块，但是不能按需加载，必须提前加载所需依赖

### ES6 module

接口：import、export、export default

特点：

1. ES6 模块之中，顶层的 this 指向 undefined，即不应该在顶层代码使用 this
2. 自动采用严格模式"use strict"。须遵循严格模式的要求
3. ES6 模块的设计思想是尽量的静态化，编译时加载”或者静态加载，编译时输出接口
4. ES6 模块 export、import 命令可以出现在模块的任何位置，但是必须处于模块顶层。如果处于块级作用域内，就会报错
5. ES6 模块输出的是值的引用

### Tree-Shaking

介绍：消除无用的代码，减少 js 包的大小，从而减少页面的加载时间。

原理：找到有用的代码打包进去。依赖 es6 的 module 模块，tree shaking 会分析文件项目里具体哪些代码被引入了，哪些没有引入，然后将真正引入的代码打包进去，最后没有使用到的代码自然就不会存在了。
