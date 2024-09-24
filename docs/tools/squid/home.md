# Squid

> [!tip] 概要
>
> - 服务端部署 squid 服务，提供了一个简单的配置示例
> - 客户端使用浏览器插件（比如 SwitchyOmega）进行代理访问

## 简介

一款代理软件，可以用来科学上网，包含服务端和客户端

## 服务端

```shell
# 安装
sudo apt install squid -y
# 启动
sudo systemctl start squid
# 查看状态
sudo systemctl status squid
# 编辑配置文件
$ sudo cp /etc/squid/squid.conf /etc/squid/squid.conf.bak
$ sudo vi /etc/squid/squid.conf
```

配置文件内容如下：

```shell
# 修改端口，默认为 3128
http_port 8800
# 添加 ，为允许所有ip
http_access allow all
via off
forwarded_for delete
```

:::warning
TODO：以上配置是没有身份认证的，后续优化添加 http 身份认证
:::

## 客户端

### 浏览器

在浏览器使用代理插件配置 ip、端口即可:

![alt text](../../assets/pasted-file-image-19.png)

### 终端代理

```shell
# 设置代理
export https_proxy=http://xx.xx.xx.xx:8800;export http_proxy=http://xx.xx.xx.xx:8800;
# 取消代理
unset http_proxy;unset https_proxy;
# 测试代理
curl cip.cc

# 如果代理需要登陆的情况
export http_proxy=http://userName:password@proxyAddress:port
```
