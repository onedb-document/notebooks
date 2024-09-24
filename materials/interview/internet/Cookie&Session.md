---
toc: menu
order: 2
---

# Cookie&Session

## cookie 机制

Cookie 和 Session 机制，参考：https://blog.csdn.net/fangaoxin/article/details/6952954

- 本质上是一小段文本信息，保存在客户端。客户端第一次请求服务器，服务器会给客户端颁发一个通行证，后续请求的时候，会携带这个通行证（cookie），这样服务器就能识别客户端了。
- 可以被覆盖，写入相同名称的 cookie。
- cookie 功能需要浏览器的支持，大部分手机浏览器就不支持 cookie，不同的浏览器有不同的保存方式。
- 不可跨域名访问 cookie
- 保存中文：需要使用 unicode 编码，一般 utf-8 即可。
- 所有字段：
  - name，名称
  - value，值
  - domain，可以访问此 cookie 的域名
  - path，可以访问此 cookie 的页面路径
  - expires/Max-Age，cookie 超时时间，不设置默认为-1，表示关掉浏览器就会失效。和 Session 一样
  - Size，cookie 大小
  - httponly 属性，若为 true，则只会在 http 请求头中携带 cookie 信息，而`document.cookie`不能访问。
  - secure，是否只能通过 https 来传递 cookie
- 有效期为 expires/Max-Age 设置，删除的话，就设置为 0，-1 有其他含义

## Session 机制

除了使用 Cookie，Web 应用程序中还经常使用 Session 来记录客户端状态。Session 是服务器端使用的一种记录客户端状态的机制，使用上比 Cookie 简单一些，相应的也增加了服务器的存储压力。

Session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 Session 保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是 Session。客户端浏览器再次访问时只需要从该 Session 中查找该客户的状态就可以了。

如果说 Cookie 机制是通过检查客户身上的“通行证”来确定客户身份的话，那么 Session 机制就是通过检查服务器上的“客户明细表”来确认客户身份。Session 相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

### 生命周期

Session 保存在服务器端。为了获得更高的存取速度，服务器一般把 Session 放在内存里。每个用户都会有一个独立的 Session。

Session 在用户第一次访问服务器的时候自动创建。

Session 生成后，只要用户继续访问，服务器就会更新 Session 的最后访问时间，并维护该 Session。

### 有效期

由于会有越来越多的用户访问服务器，因此 Session 也会越来越多。为防止内存溢出，服务器会把长时间内没有活跃的 Session 从内存删除。这个时间就是 Session 的超时时间。如果超过了超时时间没访问过服务器，Session 就自动失效了。

### Session 对浏览器的要求

虽然 Session 保存在服务器，对客户端是透明的，它的正常运行仍然需要客户端浏览器的支持。这是因为 Session 需要使用 Cookie 作为识别标志。HTTP 协议是无状态的，Session 不能依据 HTTP 连接来判断是否为同一客户，因此服务器向客户端浏览器发送一个名为 JSESSIONID 的 Cookie，它的值为该 Session 的 id（也就是 HttpSession.getId()的返回值）。Session 依据该 Cookie 来识别是否为同一用户。

该 Cookie 为服务器自动生成的，它的 maxAge 属性一般为–1，表示仅当前浏览器内有效，并且各浏览器窗口间不共享，关闭浏览器就会失效。

**因此同一机器的两个浏览器窗口访问服务器时，会生成两个不同的 Session。但是由浏览器窗口内的链接、脚本等打开的新窗口（也就是说不是双击桌面浏览器图标等打开的窗口）除外。这类子窗口会共享父窗口的 Cookie，因此会共享一个 Session。**

如果客户端浏览器将 Cookie 功能禁用，或者不支持 Cookie 怎么办？例如，绝大多数的手机浏览器都不支持 Cookie。Java Web 提供了另一种解决方案：URL 地址重写。

### URL 地址重写

RL 地址重写是对客户端不支持 Cookie 的解决方案。URL 地址重写的原理是将该用户 Session 的 id 信息重写到 URL 地址中。服务器能够解析重写后的 URL 获取 Session 的 id。这样即使客户端不支持 Cookie，也可以使用 Session 来记录用户状态。
