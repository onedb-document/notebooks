---
toc: menu
order: 3
---

# lint-staged

在代码提交之前，进行代码规则检查能够确保进入 git 库的代码都是符合代码规则的。但是整个项目上运行 lint 速度会很慢，lint-staged 能够让 lint 只检测暂存区的文件，所以速度很快。

lint-staged 过滤文件采用 glob 模式。

参考：[https://www.npmjs.com/package/lint-staged](https://www.npmjs.com/package/lint-staged)

## 安装

```bash
npm install --save-dev lint-staged
```

## 配置

package.json 中配置（示例）：

```bash
{
  "lint-staged": {
    "*.js": "eslint --fix",
    "*.md": [
      "prettier --write"
    ]
  }
}
```

示例中：对*.js 执行 eslint 命令，对*.md 执行 prettier 命令（eslint、prettier 要提前配置好）。

## 触发

git commit 时触发 pre-commit 钩子，（在 husky 钩子或者原生钩子脚本中）运行 lint-staged 命令。

```bash
npm run lint-staged
```
