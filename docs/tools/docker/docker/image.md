---
toc: menu
order: 5
---

# 镜像使用

## 列出镜像
以下命令会列出本地主机的镜像：

```shell
docker images
```

## 查找镜像
以下命令会在docker hub中查找名为`nginx`的镜像：

```shell
docker search nginx
```

## 拉取镜像
以下命令会拉取nginx镜像：
```shell
docker pull nginx
```

## 删除镜像
以下命令会删除nginx镜像：
```shell
docker rmi nginx
```

## 运行镜像
参考[快速开始](/docker/quick-start)，快速运行一个镜像：
```shell
docker run ubuntu:15.10 /bin/echo "Hello world"
```
更多关于`docker run`的相关点参考[容器](/docker/container)

## 创建镜像
如果拉取的镜像不满足需求时，可以通过以下方式更改镜像：
1. 从已经运行的容器中更新镜像，并提交为镜像，具体命令示例：`docker commit -m="提交描述信息" -a="镜像作者" 容器id 镜像名`
2. 使用Dockerfile指令来创建一个新的镜像，具体命令示例：`docker build -t 镜像名 Dockerfile文件所在目录`，参考[Dockerfile学习笔记](/Dockerfile)。

## 设置镜像标签
以下命令会根据`镜像id为xxxxxxxxx的镜像`创建一个名为‘testUser/nginx:4.4’的镜像，`原镜像还存在（不变）`：
```shell
docker tag xxxxxxxxx testUser/nginx:4.4
```