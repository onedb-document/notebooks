# 搭建 minikube 环境记录

## linux

### 安装 docker

[参考](https://www.runoob.com/docker/centos-docker-install.html)

#### 一键安装脚本

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

失败了，访问不了

#### 手动安装

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

### 安装 docker

之前安装过了，略

### 安装 minikube

```bash
# 安装minikube
brew install minikube

# kubectl命令行工具和minikube是独立的，没有包含在minikube里，minikube提供了简便的安装方式
minikube kubectl

# 启动
minikube start --image-mirror-country='cn' --force
minikube start --driver=docker --container-runtime=containerd --image-mirror-country='cn' --force
minikube start --driver=docker --image-mirror-country='cn' --image-repository='docker.io' --ports=127.0.0.1:32000:32000

# 启用 dashboard
minikube dashboard
```

https://blog.csdn.net/b5wang/article/details/107028664
