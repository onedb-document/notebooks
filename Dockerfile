# 第一步构建，进行打包，生成html静态资源等打包产物
FROM node:18 AS build

WORKDIR /app

COPY . .

RUN yarn

RUN yarn run docs:build

# 第二步构建，复制第一步打包的资源
FROM nginx:latest

# 复制静态资源文件html、css、js、png等等
COPY --from=build /app/docs/.vitepress/dist/ /usr/share/nginx/html/notebooks/

ENV TZ="Asia/Shanghai"

EXPOSE 80
