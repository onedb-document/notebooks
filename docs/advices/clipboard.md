---
toc: menu
order: 2
---

# clipboard.js

## 介绍

`clipboard.js`是一款轻量级的实现复制文本到剪贴板功能的JavaScript插件。通过该插件可以将输入框，文本域，DIV元素中的文本等文本内容复制到剪贴板中。

`clipboard.js`支持主流的浏览器：`chrome 42+; Firefox 41+; IE 9+; opera 29+; Safari 10+`。

## 安装

```bash
# npm
npm install --save clipboard
# or yarn
yarn add clipboard
```

## 使用

### 示例1

```html
<button class="btn">Copy_target</button>
<div>hello</div>
<script>
var clipboard = new Clipboard('.btn', {
  // 通过target指定要复印的节点
  target: function() {
    return document.querySelector('div');
  }
});
clipboard.on('success', function(e) {
  console.log(e);
});
clipboard.on('error', function(e) {
  console.log(e);
});
</script>
```

### 示例2

```html
<button class="btn">Copy</button>
<script>
var clipboard = new Clipboard('.btn', {
  // 点击copy按钮，直接通过text直接返回复印的内容
  text: function() {
    return 'to be or not to be';
  }
});
clipboard.on('success', function(e) {
  console.log(e);
});
clipboard.on('error', function(e) {
  console.log(e);
});
```

### 简单封装

```ts
import Clipboard from 'clipboard';
import { message } from 'antd';

function clipboardSuccess() {
  message.info('复制成功✌️');
}

function clipboardError() {
  message.info('复制失败!');
}

export default function handleClipboard(text: string, event: any) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  });
  clipboard.on('success', () => {
    clipboardSuccess();
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    clipboardError();
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
```
