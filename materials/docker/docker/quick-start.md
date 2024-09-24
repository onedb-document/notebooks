---
toc: menu
order: 4
---

# 快速开始

## hello world

以下命令会让docker在容器中运行一串代码，输出`hello world`:

```shell
docker run ubuntu:15.10 /bin/echo "Hello world"
```

## 参数解析

- docker:Docker 的二进制执行文件
- run:与前面的 docker 组合来运行一个容器
- ubuntu:15.10:指定要运行的镜像，Docker 首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像
- /bin/echo "Hello world":在启动的容器里执行的命令
