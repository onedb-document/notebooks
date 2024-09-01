# linux 系统部分操作整理

## 搭建 docker 环境

### 安装 docker

**官方安装脚本**

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**验证**

```shell
docker info
```

### 安装 docker-compose

**下载二进制包**

[最新版本地址参考](https://github.com/docker/compose/releases)

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```shell
# 添加可执行权限
sudo chmod +x /usr/local/bin/docker-compose
# 创建软链
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

**测试**

```shell
docker-compose version
```

参考：

[Debian Docker 安装](https://www.runoob.com/docker.../debian-docker-install.html)
[Docker Compose](https://www.runoob.com/docker.../docker-compose.html)

## ssh

### 配置 ssh 免密登录

https://cloud.baidu.com/article/3277615
