---
toc: menu
order: 2
---

# yorkie

yorkie 实际是 fork 自 husky，然后做了一些定制化的改动，使得钩子能从 package.json 的 "gitHooks"属性中读取。

是另一种配置 githooks 的工具。

## 安装

```bash
npm install --save-dev yorkie
```

## 配置

```bash
# package.json
{
  "gitHooks": {
    "pre-commit": "npm run lint-staged"
  }
}
```

## 注意事项

yorkie 已经很长时间没有维护，故不推荐使用。
