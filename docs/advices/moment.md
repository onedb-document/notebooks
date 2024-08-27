---
toc: menu
order: 3
---

# moment.js

## 介绍

JavaScript 日期处理类库。

[官网：http://momentjs.cn/](http://momentjs.cn/)

## 安装

```bash
npm install moment --save   # npm
yarn add moment             # Yarn
Install-Package Moment.js   # NuGet
spm install moment --save   # spm
meteor add momentjs:moment  # meteor
bower install moment --save # bower (废弃)
```

## 官网示例

### 日期格式化

```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // 二月 14日 2022, 11:00:47 上午
moment().format('dddd');                    // 星期一
moment().format("MMM Do YY");               // 2月 14日 22
moment().format('YYYY [escaped] YYYY');     // 2022 escaped 2022
moment().format();                          // 2022-02-14T11:00:47+08:00
```

### 相对时间

```js
moment("20111031", "YYYYMMDD").fromNow(); // 10 年前
moment("20120620", "YYYYMMDD").fromNow(); // 10 年前
moment().startOf('day').fromNow();        // 11 小时前
moment().endOf('day').fromNow();          // 13 小时内
moment().startOf('hour').fromNow();       // 1 分钟前
```

### 日历时间

```js
moment().subtract(10, 'days').calendar(); // 2022/02/04
moment().subtract(6, 'days').calendar();  // 上星期二11:00
moment().subtract(3, 'days').calendar();  // 上星期五11:00
moment().subtract(1, 'days').calendar();  // 昨天11:00
moment().calendar();                      // 今天11:00
moment().add(1, 'days').calendar();       // 明天11:00
moment().add(3, 'days').calendar();       // 下星期四11:00
moment().add(10, 'days').calendar();      // 2022/02/24
```

### 多语言支持

```js
moment.locale();         // zh-cn
moment().format('LT');   // 11:00
moment().format('LTS');  // 11:00:47
moment().format('L');    // 2022/02/14
moment().format('l');    // 2022/2/14
moment().format('LL');   // 2022年2月14日
moment().format('ll');   // 2022年2月14日
moment().format('LLL');  // 2022年2月14日上午11点00分
moment().format('lll');  // 2022年2月14日 11:00
moment().format('LLLL'); // 2022年2月14日星期一上午11点00分
moment().format('llll'); // 2022年2月14日星期一 11:00
```