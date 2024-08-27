---
nav:
  title: 仓库
  order: 4
toc: menu
---

# docker registry

## 简介

在 Docker 中，当我们执行 docker pull xxx 的时候 ，它实际上是从 registry.hub.docker.com 这个地址去查找，这就是 Docker 公司为我们提供的公共仓库。在工作中，我们不可能把企业项目 push 到公有仓库进行管理。所以为了更好的管理镜像，Docker 不仅提供了一个中央仓库，同时也允许我们搭建本地私有仓库。一般有 registry、harbor 两种私有仓库搭建的方式，本篇介绍 registry 的方式。

## registry 的搭建

Docker 官方提供了一个搭建私有仓库的镜像 registry ，只需把镜像下载下来，运行容器并暴露 5000 端口，就可以使用了。

缺点：缺少对镜像的管理、权限的管理等等，不适合公共项目。

## 阿里私有镜像服务

登录阿里云后台，每个人都有一个私人免费的镜像仓库地址。
