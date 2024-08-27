# 安装 docker 记录

## linux

[参考](https://www.runoob.com/docker/centos-docker-install.html)

### 一键安装脚本

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

失败了，应该要翻墙，采用手动安装

### 手动安装

```shell
sudo yum install -y yum-utils
# 设置稳定的仓库
sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 安装最新版本的 Docker Engine-Community 和 containerd
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
# 启动docker
sudo systemctl start docker
# 设置开机自启
sudo systemctl enable docker
# 验证是否安装正确
sudo docker run hello-world
```

## mac

无

## windows

无
