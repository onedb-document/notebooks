---
toc: menu
order: 2
---

# dokcer安装

## windows

1. [安装 WSL](https://docs.microsoft.com/zh-cn/windows/wsl/install)
2. [安装 docker desktop](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

## ubuntu

- 使用官方安装脚本
  - 安装命令如下：
  ```shell
  curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
  ```
  - 也可以使用国内 daocloud 一键安装命令：
  ```shell
  curl -sSL https://get.daocloud.io/docker | sh
  ```
- 其他方式（略）
  参考[官网](https://docs.docker.com/engine/install/ubuntu/)

## 其他

请参考[菜鸟教程](https://www.runoob.com/docker/docker-tutorial.html)以及[官网](https://docs.docker.com/engine/install/)
