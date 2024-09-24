---
toc: menu
order: 6
---

# 容器使用

## 列出容器

```shell
# 列出正在运行的容器
docker ps
# 列出所有的容器
docker ps -a
```

## 启动

```shell
# 语法
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
# 根据ubuntu镜像启动一个容器，命名为ubuntu-test
docker run -it --name ubuntu-test ubuntu
# 启动已经停止的容器
docker start xxx
```

常用 OPTIONS 说明

- -i，-t：-i 以交互模式运行容器，-t 为容器重新分配一个伪输入终端，通常一起使用；
- -d：后台运行容器；
- -P：容器内部端口随机映射到主机的端口；
- -p：指定端口映射，格式为：`宿主机端口：容器端口`;
- --name="test"：容器名称为 test；
- -v：映射宿主机的卷

## 停止

```shell
docker stop xxx
```

## 重启

查了一下资料：

- `docker start ...` 包含容器文件系统挂载的操作
- `docker stop ...` 包含容器文件系统卸载的操作
- `docker restart ...` 不包含容器文件系统的卸载与挂载操作，本质上 docker restart 不涉及文件系统的操作，因此 restart 命令并不是 stop 与 start 两个命令的顺序叠加。

结论：为了保证容器的根文件系统与内存系统 mount 的正确性，推荐`对一个容器的重启使用docker stop xxx，然后 docker start xxx，而非docker restart xxx。`

```shell
docker restart xxx
```

## 删除

```shell
docker rm xxx
# 上面的命令在删除正在运行的容器是会报错
# 下面的会强制删除容器，不管它是否在运行
docker rm -f xxx
```

## 查看日志

如果容器启动失败，可以使用 logs 查看日志：

```shell
docker logs xxx
```

## 进入容器

```bash
docker exec -it 容器id /bin/bash
```

## 导出和导入容器

```bash
# 导出
docker export 容器id > ubuntu.tar
# 导入容器快照
cat docker/ubuntu.tar | docker import - test/ubuntu:v1
# 导入指定 URL
docker import http://example.com/exampleimage.tgz example/imagerepo
```
