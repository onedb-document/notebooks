# 镜像加速

## 阿里云镜像加速

[参考](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

编辑 daemon 配置文件`/etc/docker/daemon.json`

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://***.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
