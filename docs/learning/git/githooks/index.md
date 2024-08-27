---
nav:
  title: githooks
  order: 1
toc: menu
order: 1
---

# githooks

参考官网[自定义 Git - Git 钩子](https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子)

## 介绍

在进行 git 操作的时候，git 提供了一些钩子，可以执行一系列脚本。

在 git 项目根目录下面，.git/hooks 子目录里面，有以`.sample`结尾的若干文件，就是提供的 hooks 示例，如果想要启用的话，就去除`.sample`。

## 常用钩子

- pre-commit：钩子在键入提交信息前运行。一般用来检查代码风格是否一致、代码单元测试等等，可以用 `git commit --no-verify` 来绕过这个环节。
- commit-msg 钩子接收一个参数，存有当前提交信息的临时文件的路径。如果该钩子脚本以非零值退出，Git 将放弃提交，可以用来校验提交信息。
- 其他..

## 注意事项

[摘自官网:](https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子#_客户端钩子)

> 需要注意的是，克隆某个版本库时，它的客户端钩子 并不 随同复制。 如果需要靠这些脚本来强制维持某种策略，建议你在服务器端实现这一功能。

因此，若要复用自己或他人的 hooks 脚本，可能就有点困难。有一种比较好的解决方案，参考下一节的[husky](/githooks/husky)。
