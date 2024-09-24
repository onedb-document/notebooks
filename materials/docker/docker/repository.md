---
toc: menu
order: 8
---

# 仓库管理

## docker hub

默认的镜像仓库是 Docker 官方维护的[Docker Hub](https://hub.docker.com/)。

### 注册

免费注册一个 Docker 账号：[https://hub.docker.com/](https://hub.docker.com/)。

### 登录

```bash
docker login
```

### 退出

```bash
docker logout
```

## 其他操作

### 搜索镜像

```bash
docker search ubuntu
```

### 拉取镜像

```bash
docker pull ubuntu
```

### 推送镜像

```bash
# 设置tag
docker tag ubuntu:18.04 xxxx/ubuntu:18.04
# 推送
docker push xxxx/ubuntu:18.04
```
