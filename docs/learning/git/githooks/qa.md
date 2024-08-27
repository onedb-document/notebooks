---
toc: menu
---

# QA
## husky 配置了为什么不生效？
原因：husky 的新版本和老版本是不一样的，在 package.json 中的配置，只适用 4.x。而 7.x 的配置是项目根目录中的.husky 目录，需要执行`npx husky install`生成。[参考官网](https://typicode.github.io/husky/#/?id=install)

补充：为方便其他人拉取代码，可以添加一个 scripts，在`npm install`之后自动生成执行：

```bash
"scripts": { "prepare": "husky install" }
```

这样后续的开发人员是不需要关心 husky 配置。

## lint-staged 匹配不到文件？

参考：[https://zhuanlan.zhihu.com/p/102104085](https://zhuanlan.zhihu.com/p/102104085)

1. 文件被 staged 了么
   从源码中可以看出，lint-staged 只针对变更的文件，也就是 git add 后的文件做 lint 校验，所以这名字可以这么翻译：lint staged files。

2. 尝试安装 glob
    ```bash
    yarn add -D glob
    ```
