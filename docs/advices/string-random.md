---
toc: menu
order: 2
---

# string-random

## 介绍

JS Core只提供了Math.random() 用于生成随机数字，但是并未提供生成字符串的函数，要自己写生成随机字符串逻辑需要费一番周折。string-random库专门用于快速生成随机字符串，并且可以根据需求制定字符串长度以及包含的字符。

## 语法

`stringRandom(length, options)`函数的第一个参数length为要生成的字符串长度，第二个参数是选项：
- options 为true，生成包含字母、数字和特殊字符的字符串。
- options 为字符串，从options字符串中提供的字符生成随机结果。
- options 为对象。

options 为对象：
- options.letters
  - true (默认) 允许大小写字母
  - false 不允许大小写字母
  - string 从提供的字符生成随机结果
- options.numbers
  - true (默认) 允许数字
  - false 不允许数字
  - string 从提供的字符生成随机结果
- options.specials
  - true 允许特殊字符
  - false (默认) 不允许特殊字符
  - string 从提供的字符生成随机结果

## 示例

```js
const stringRandom = require('string-random');
 
// 生成长度为8，包含大小写字母和数字的随机字符串
random(); // oSjAbc02
 
// 生成长度为16，包含大小写字母和数字的随机字符串
random(16); // d9oq0A3vooaDod8X
 
// 包含大小写字母的随机字符串(不包含数字)
random(16, {numbers: false});  // AgfPTKheCgMvwNqX
 
// 包含数字的随机字符串(不包含字母)
random(16, {letters: false});  // 0889014544916637
 
// 包含制定字母和数字的随机字符串
random(16, {letters: 'ABCDEFG'});  // 055B1627E43GA7D8
 
// 包含特殊字符
random(16, {specials: true}); // ,o=8l{iay>AOegW[ 
random(16, true);             // SMm,EjETKMldIM/J
 
// 指定字符
random(16, '01'); // 1001001001100101
```