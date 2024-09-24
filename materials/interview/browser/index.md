---
nav:
  title: 浏览器
  order: 6
toc: menu
order: 1
---

# 浏览器

## 知识点

- 从输入 URL 到浏览器显示页面经过了什么
- 浏览器渲染原理
- 回流和重绘
- 浏览器缓存机制

## 从输入 URL 到浏览器显示页面经过了什么

- 首先，在浏览器地址栏中输入 url
- 浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕中显示页面内容。若没有，则跳到第三步操作。
- 在发送 http 请求前，需要域名解析(DNS 解析)，解析获取相应的 IP 地址，DNS 具体解析过程参考前面。
- 浏览器向服务器发起 tcp 连接，与浏览器建立 tcp 三次握手，三次握手在前端面试之网络篇中也有介绍。
- 握手成功后，浏览器向服务器发送 http 请求，请求数据包。
- 服务器处理收到的请求，将数据返回至浏览器。
- 浏览器收到 HTTP 响应。
- 读取页面内容，开始浏览器渲染。
- 解析 HTML，生成 Dom 树，解析 css 样式，生成 CSSOM 树，两者结合生成 Render 树。解析包括标记化和生成树两个过程，这期间还可能存在 js 和 css 阻塞，具体的过程可以在用 Chrome Performance 分析浏览器渲染原理中查看。
- 另外，如果是 HTTPS 协议，还会在 TCP 通信之前利用 SSL 协议的加密传输。

## 浏览器渲染原理

简单说就是解析 HTML 文档，生成 DOM 树，解析 CSS 文档生成 CSSOM 树，DOM 树与 CSSOM 树结合会生成 Render 树，然后发生回流，页面渲染。在解析 HTML 文档的时候，如果遇到 js，就暂停解析，等 script 执行完在继续解析，如果样式表正在解析的话，js 会先等样式表解析完成。也就是说，css 解析优先于 js 解析，js 解析优先于 html 解析。原因当然就是前者会影响后者的解析。

[用 Chrome Performance 分析浏览器渲染原理](https://blog.csdn.net/qq_42532128/article/details/103074589)

## 回流和重绘

当 render 树中发生元素的规模、位置、显示隐藏等变化时就会发生回流（也叫重排），页面第一次渲染的时候一定会发生回流。

当 render 树仅仅发生外观变化而不影响布局时会发生重绘。

比如，元素的 margin、padding、display、width、height 改变会引起回流，background-color 改变会引起重绘。

回流必引起重绘，重绘不一定会引起回流。

由于发生回流和重绘时，浏览器需要重新构建 render 树，因此这是很影响性能的，我们在写代码时要尽量减少回流和重绘。比如在添加 DOM 节点时，试着用一个变量接收要添加的所有节点，然后一次全部添加上去。

## 浏览器缓存机制

参考[实践这一次，彻底搞懂浏览器缓存机制](https://segmentfault.com/a/1190000017962411#item-5)

访问缓存优先级：

1. 内存（memory cache）
2. 磁盘（disk cache）
3. 网络请求

### 强缓存

浏览器在加载资源时，会先根据本地缓存资源的 header 中的信息判断是否命中强缓存，如果命中则直接使用缓存中的资源不会再向服务器发送请求。

这里的 header 中的信息指的是 expires 和 cahe-control。

### Expires

Expires，该字段是 http1.0 时的规范，它的值为一个绝对时间的 GMT 格式的时间字符串，比如 Expires:Mon,18 Oct 2066 23:59:59 GMT。这个时间代表着这个资源的失效时间，在此时间之前，即命中缓存。这种方式有一个明显的缺点，由于失效时间是一个绝对时间，所以当服务器与客户端时间偏差较大时，就会导致缓存混乱。

### Cache-Control

Cache-Control 是 http1.1 时出现的 header 信息，主要是利用该字段的 max-age 值来进行判断，它是一个相对时间，例如 Cache-Control:max-age=3600，代表着资源的有效期是 3600 秒。cache-control 除了该字段外，还有下面几个比较常用的设置值：

- no-cache：需要进行协商缓存，发送请求到服务器确认是否使用缓存。
- no-store：禁止使用缓存，每一次都要重新请求数据。
- public：可以被所有的用户缓存，包括终端用户和 CDN 等中间代理服务器。
- private：只能被终端用户的浏览器缓存，不允许 CDN 等中继缓存服务器对其缓存。
- Cache-Control 与 Expires 可以在服务端配置同时启用，同时启用的时候 Cache-Control 优先级高。

### 协商缓存

当强缓存没有命中的时候，浏览器会发送一个请求到服务器，服务器根据 header 中的部分信息来判断是否命中缓存。如果命中，则返回 304 ，告诉浏览器资源未更新，可使用本地的缓存。

这里的 header 中的信息指的是 Last-Modify/If-Modify-Since 和 ETag/If-None-Match。

### Last-Modify/If-Modify-Since

浏览器第一次请求一个资源的时候，服务器返回的 header 中会加上 Last-Modify，Last-modify 是一个时间标识该资源的最后修改时间。

当浏览器再次请求该资源时，request 的请求头中会包含 If-Modify-Since，该值为缓存之前返回的 Last-Modify。服务器收到 If-Modify-Since 后，根据资源的最后修改时间判断是否命中缓存。

如果命中缓存，则返回 304，并且不会返回资源内容，并且不会返回 Last-Modify。

### ETag/If-None-Match

与 Last-Modify/If-Modify-Since 不同的是，Etag/If-None-Match 返回的是一个校验码。ETag 可以保证每一个资源是唯一的，资源变化都会导致 ETag 变化。服务器根据浏览器上送的 If-None-Match 值来判断是否命中缓存。

与 Last-Modified 不一样的是，当服务器返回 304 Not Modified 的响应时，由于 ETag 重新生成过，response header 中还会把这个 ETag 返回，即使这个 ETag 跟之前的没有变化。

Last-Modified 与 ETag 是可以一起使用的，服务器会优先验证 ETag，一致的情况下，才会继续比对 Last-Modified，最后才决定是否返回 304。

### last-modified 缺点

- 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新 get；
- 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说 1s 内修改了 N 次)，if-modified-since 能检查到的粒度是秒级的，这种修改无法判断(或者说 UNIX 记录 MTIME 只能精确到秒)；
- 某些服务器不能精确的得到文件的最后修改时间。
