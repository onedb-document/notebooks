# 管理

> [!tip] 概要
>
> 在 Linux 系统下，使用 systemd 可以方便地控制 frps 服务端的启动、停止、配置后台运行以及开机自启动。

## 安装 systemd

```shell
# 使用 yum 安装 systemd（CentOS/RHEL）
yum install systemd

# 使用 apt 安装 systemd（Debian/Ubuntu）
apt install systemd
```

## 创建 frps.service 文件

```shell
sudo vim /etc/systemd/system/frps.service
```

写入内容

```shell
[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /www/server/frp/frps -c /www/server/frp/frps.toml

[Install]
WantedBy = multi-user.target
```

## 使用 systemd 命令管理 frps 服务

```shell
# 启动frp
sudo systemctl start frps
# 停止frp
sudo systemctl stop frps
# 重启frp
sudo systemctl restart frps
# 查看frp状态
sudo systemctl status frps
# 设置 frps 开机自启动
sudo systemctl enable frps
```
