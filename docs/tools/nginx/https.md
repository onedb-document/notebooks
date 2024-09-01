# 搭建 https

[参考文章](https://blog.csdn.net/weixin_31655741/article/details/82226688)

## 获得证书

参考上面的文章

> 注意时间限制，一般是一年，到期了要进行更换。

## 部署

其实就是把证书文件放到服务器上，然后对 nginx 进行配置。

使用任何一款上传工具，xftp 等等

## 80 端口重定向

```
server {
    listen 80;
    server_name www.域名.com;
    rewrite ^(.*)$ https://${server_name}$1 permanent;
}
```

## 我的配置

```bash
...

http{
  ...
  server {
    listen 443 ssl;
    server_name localhost;
    # ssl on;
    root /usr/share/nginx/html; # 使用你的地址
    index index.html index.htm;
    ssl_certificate   /etc/nginx/cert/xxxx.crt; # 使用你的文件地址
    ssl_certificate_key  /etc/nginx/cert/xxxx.key; # 使用你的文件地址
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
  }
  ...
}
```

## 验证

重启 nginx，使用 https 进行访问，看是否部署 https 成功。
