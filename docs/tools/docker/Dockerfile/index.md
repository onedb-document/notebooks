---
nav:
  title: Dockfile
  order: 2
toc: menu
order: 1
---

# Dockfile

## 介绍

Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。

## 从一个最简单的例子开始

### 新建 Dockfile 文件

在一个空目录下，新建一个名为 `Dockerfile` 文件，并在文件内添加以下内容：

```bash
FROM nginx
RUN echo '这是一个本地构建的nginx镜像' > /usr/share/nginx/html/index.html
```

参数解释：

- FROM nginx：`From`指令是指定基础镜像，后续的操作都是基于`nginx`，nginx 后面跟着（默认的）tag：`latest`，当然也可以使用其他 tag
- RUN：`RUN`指令用于执行后面跟着的命令

### 从 Dockfile 文件构建

在当前目录下运行：

```bash
docker build -t nginx:mynginx .
```

参数解释

- `docker build`是 docker 构建镜像的命令
- `-t nginx:mynginx`表示镜像名称
- `.`代表上下文路径，这里指的是当前文件夹

> **注意**：上下文路径下不要放无用的文件，因为会一起打包发送给 docker 引擎，如果文件过多会造成过程缓慢。

## 指令详解

### FROM

定义基础镜像，后续的操作都是基于此基础镜像的

```bash
# 新版本（17.05以后）支持多FROM指令，这里给这个阶段加上别名为build，后续可以使用COPY --from=build 源路径 目标路径
FROM node:14 AS build
# 使用nginx作为基础镜像
FROM nginx:latest
```

### WORKDIR

```bash
# 设置当前工作目录为`/app`
WORKDIR /app
```

### COPY

```bash
# 从宿主机的当前目录，拷贝到工作目录下
COPY . .
# 从build构建中，拷贝/app/nginx/html到/usr/share/nginx/html
COPY --from=build /app/nginx/html /usr/share/nginx/html
```

### ADD

和 COPY 类似，官方推荐使用 COPY，我这里也暂未了解

### RUN

运行程序

```bash
# 在镜像构建时，运行npm run build:doc
RUN npm run build:doc
```

### CMD

类似于 RUN 指令，用于运行程序，但二者运行的时间点不同:

- `CMD` 在 docker run 时运行。
- `RUN` 是在 docker build。

> 注意：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。

### ENTRYPOINT

类似于 CMD 指令，但其不会被 docker run 的命令行参数指定的指令所覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。

> 注意：如果 Dockerfile 中如果存在多个 ENTRYPOINT 指令，仅最后一个生效。

### ENV

设置环境变量，定义了环境变量，那么在后续的指令中，就可以使用这个环境变量。

```bash
# 格式
ENV <key> <value>
ENV <key1>=<value1> <key2>=<value2>...
# 设置时区
ENV TZ="Asia/Shanghai"
```

以下示例设置 NODE_VERSION = 7.2.0 ， 在后续的指令中可以通过 $NODE_VERSION 引用：

```bash
ENV NODE_VERSION 7.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc"
```

### ARG

构建参数，与 ENV 作用一致。不过作用域不一样。ARG 设置的环境变量仅对 Dockerfile 内有效，也就是说只有 docker build 的过程中有效，构建好的镜像内不存在此环境变量。

### VOLUME

定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。

作用：

- 避免重要的数据，因容器重启而丢失，这是非常致命的。
- 避免容器不断变大。

格式：

```bash
VOLUME ["<路径1>", "<路径2>"...]
VOLUME <路径>
```

### EXPOSE

仅仅只是声明端口。
格式：

```bash
EXPOSE <端口1> [<端口2>...]
```

### LABEL

LABEL 指令用来给镜像添加一些元数据（metadata），以键值对的形式，语法格式如下：

```bash
LABEL <key>=<value> <key>=<value> <key>=<value> ...
# 比如：
LABEL target="documents"
```

### USER

用于指定执行后续命令的用户和用户组，这边只是切换后续命令执行的用户（用户和用户组必须提前已经存在）。

格式：

```
USER <用户名>[:<用户组>]
```

### ...
