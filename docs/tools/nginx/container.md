---
toc: menu
order: 5
---

# 结合容器使用

## 拉取 nginx 镜像

```bash
# 自行安装docker
docker pull nginx # 拉取最新的nginx镜像
docker images # 验证
```

## 运行挂载目录的容器

```
docker run -p 80:80 -p 443:443 -v path/to/your/nginx.conf:/etc/nginx/nginx.conf -v path/to/your/files:/usr/share/nginx/html -v path/to/your/cert:/etc/nginx/cert --name nginx-main -d nginx
```

参数解释：

- docker run，运行容器
- -p 80:80 -p 443:443，映射端口
- -v path/to/your/nginx.conf:/etc/nginx/nginx.conf -v path/to/your/files:/usr/share/nginx/html -v path/to/your/cert:/etc/nginx/cert，挂载目录，这样可以方便的在宿主机中操作配置文件、替换证书、部署静态资源
- --name nginx-main，运行的容器的别名，方便后续其他操作（如 stop、start 等等）
- -d，后台运行
- nginx，运行的目标镜像

## 运行 Dockerfile 构建的容器

项目根目录下新建 Dockfile 文件，Dockfile 文件的编写需自行查看相关教程。

```bash
# 分阶段构建，只需要第一次构建的产物
FROM node:12 AS build

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

# 以最新的nginx镜像为基础镜像
FROM nginx:latest

# 分阶段构建，假设这里已经构建好了所需的静态资源，存放在path/to/your/files，假设为dist

# 复制静态资源文件html、css、js、png等等
COPY --from=build /app/dist /usr/share/nginx/html

# 复制nginx配置文件
COPY --from=build /app/path/to/your/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
```

```bash
# 构建镜像
docker build -t 镜像名 .

# 运行容器：
docker run -p 8888:80 --name nginx-main -d 镜像名
```
