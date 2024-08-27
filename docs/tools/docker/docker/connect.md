---
toc: menu
order: 7
---

# 容器连接

## 端口映射

容器中可以运行一些网络应用，要让外部也可以访问这些应用，可以通过 -P 或 -p 参数来指定端口映射。

- -P :是容器内部端口随机映射到主机的端口。
- -p :是容器内部端口绑定到指定的主机端口。

### 指定容器绑定的网络地址

```bash
docker run -d -p 127.0.0.1:5001:80 nginx
```

### 绑定 udp

在端口后面加上 /udp

```bash
docker run -d -p 127.0.0.1:5001:80/udp nginx
```

## 容器互联（network）

### 容器命名

使用`--name`参数运行容器：

```bash
docker run -d -p 127.0.0.1:5001:80/udp --name test1 nginx
```

### 新建网络

```bash
docker network create -d bridge test-net
```

### 运行连接到网络的容器

容器 1：

```bash
docker run -itd --name test1 --network test-net nginx
```

容器 2：

```bash
docker run -itd --name test2 --network test-net nginx
```

此时容器 1 和容器 2 就建立了互联关系

[参考地址](https://www.runoob.com/docker/docker-container-connection.html)
