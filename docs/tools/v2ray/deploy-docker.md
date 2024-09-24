# 使用 docker 部署

> [!tip] 概要
>
> - 服务端，部署 docker 容器的方式部署`v2ray`服务

## 搭建 docker 环境

略

## 服务端部署 v2ray

准备材料：`docker-compose.yaml`、`server.config.json`:

:::code-group

```yaml [docker-compose.yaml]
version: '3'
services:
  v2ray-svc:
    image: v2fly/v2fly-core:v4.34.0
    container_name: v2ray
    restart: always
    ports:
      - 7000:7000
    volumes:
      - ./server.config.json:/etc/v2ray/config.json
```

```toml [server.config.json]
{
  "inbounds": [
    {
      "port": 7000,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "b831381d-6324-4d53-ad4f-8cda48b30811",
            "level": 0,
            "alterId": 64
          }
        ]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ]
}
```

:::

## 客户端

略
