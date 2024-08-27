---
toc: menu
order: 4
---

# commitlint

一个校验 git 的提交信息的相关工具。[官网地址](https://commitlint.js.org/)

## 安装

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

## 配置

配置文件 commitlint.config.js：

```bash
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

## 触发

结合 husky 的 commit-msg 钩子，[参考地址](https://typicode.github.io/husky/)

```bash
# .huskyrc.json (v4)
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

```bash
# .husky/commit-msg (v7)
# ...
npx --no-install commitlint --edit $1
# or
yarn commitlint --edit $1
```
