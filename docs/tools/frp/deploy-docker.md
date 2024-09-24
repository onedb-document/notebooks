# 使用 docker 部署

> [!tip] 概要
>
> - 在服务端使用 docker-compose 部署 frps 服务
> - 在客户端使用 docekr-compose 部署 frpc 服务

## 搭建 docker 环境

略

## 服务端部署 frps

准备材料：`docker-compose.yaml`、`frps.toml`:

:::code-group

```yaml [docker-compose.yaml]
version: '3'
services:
  frps-svc:
    image: wangdongbing/frps:latest
    container_name: frps
    restart: always
    network_mode: host
    volumes:
      - ./frps.toml:/etc/frp/frps.toml
```

```toml [frps.toml]
# frp服务端口，客户通过此端口链接服务,需在服务器中开放端口。阿里云、腾讯云注意控制台中也要开放对应的端口
bindPort = 7100

# http服务绑定的端口,需在服务器中开放
vhostHTTPPort = 7120

# 所有客户端链接都需要通过此验证
auth.method = "token"
auth.token="123456"

# web控制台，如果不需要可注释掉
webServer.addr = "0.0.0.0"
webServer.port = 7110
webServer.user = "123456"
webServer.password = "123456"

# 日志输出配置
# log.to = "/www/server/frp/log.txt"
# log.level = "info"
```

:::

## 客户端部署 frpc

准备材料：`docker-compose.yaml`、`frpc.toml`:

:::code-group

```yaml [docker-compose.yaml]
version: '3'
services:
  frpc-svc:
    image: wangdongbing/frpc:latest
    container_name: frpc
    restart: always
    network_mode: host
    volumes:
      - ./frpc.toml:/etc/frp/frpc.toml
      - your-static-files-path:/www/shared
```

```toml [frpc.toml]
# 链接公网服务的配置,和上一个服务端配置对应
serverAddr = "your-server"
serverPort = 7100
auth.method = "token"
auth.token = "******"

# 日志输出配置
# log.to="C:/frp/log.txt"
# log.level="info"

# 客户端web控制台配置
# webServer.addr = "127.0.0.1"
# webServer.port = 7100

# （1）开放本地文件系统到公网-通过公网服务器ip:8887访问
[[proxies]]
name = "static_file"
type = "tcp"
# 服务器上也要开放此端口，注意阿里云、腾讯云控制台也要开放
remotePort = 7130
# http方式开放本地文件系统
[proxies.plugin]
type = "static_file"
# 本地文件目录，对外提供访问的路径
localPath = "/www/shared"
# 网页访问的账号密码
httpUser = "******"
httpPassword = "******"

# （2）开放本地服务系统到公网，http方式,可以绑定域名，请将域名解析到你的公网服务器
# 访问方式，浏览器直接输入：www.xxxxx.com:8888，端口是服务器端配置的vhostHTTPPort
[[proxies]]
name = "nasweb"
type = "http"
# 本地服务ip:端口,可以是本机也可以局域网其他主机，比如：192.168.*.*,127.0.0.1
localIP = "host.docker.internal"
localPort = 80
customDomains = ["your-server"]

#  # （3）stcp方式开放nas系统给访问客户端，只能配置了frpc访问端的主机才能访问
#  [[proxies]]
#  name = "nasstcp"
#  type = "stcp"
#  # 只有与此处设置的 secretKey 一致的用户才能访问此服务
#  secretKey = "345678"
#  localIP = "127.0.0.1"
#  localPort = 80

#  # （4）p2p方式开放nas系统给访问客户端，只能配置了frpc访问端的主机才能访问，不占用服务器带宽，适合大文件，NAS等
#  [[proxies]]
#  name = "nasp2p"
#  type = "xtcp"
#  # 只有共享密钥 (secretKey) 与服务器端一致的用户才能访问该服务
#  secretKey = "654321"
#  localIP = "127.0.0.1"
#  localPort = 80

# 以上所有的[[proxies]] 配置根据需要设置，不需要的可以删除掉，上面示例配置做一个说明
#（1）一个文件共享系统
#（2）将本地服务直接共享公网，并配置域名，比如本地搭建的一个网站
#（3）安全的方式提供服务，需要访问者配置访问端，类似与私有的网站或者服务访问
#（4）p2p（内网主机直连）的形式，需要访问者配置访问端，跟3差不多，区别是此方式流量不经过服务器
```

:::
