---
toc: menu
order: 2
---

# 安装

## ubuntu

```bash
sudo apt update
sudo apt install nginx
```

## 检查

一旦安装完成，Nginx 将会自动被启动。你可以运行下面的命令来验证它：

```bash
sudo systemctl status nginx
```

输出类似下面：

```
nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2022-02-07 10:51:19 CST; 6min ago
     ...
```

## 配置文件以及最佳实践

- 所有的 Nginx 配置文件都在/etc/nginx/目录下。
- 主要的 Nginx 配置文件是/etc/nginx/nginx.conf。
- 为每个域名创建一个独立的配置文件，便于维护服务器。你可以按照需要定义任意多的 block 文件。
- Nginx 服务器配置文件被储存在/etc/nginx/sites-available目录下。在/etc/nginx/sites-enabled目录下的配置文件都将被 Nginx 使用。
- 最佳推荐是使用标准的命名方式。例如，如果你的域名是mydomain.com，那么配置文件应该被命名为/etc/nginx/sites-available/mydomain.com.conf
- 如果你在域名服务器配置块中有可重用的配置段，把这些配置段摘出来，做成一小段可重用的配置。
- Nginx 日志文件(access.log 和 error.log)定位在/var/log/nginx/目录下。推荐为每个服务器配置块，配置一个不同的access和error。
- 你可以将你的网站根目录设置在任何你想要的地方。最常用的网站根目录位置包括：
  - /home/<user_name>/<site_name>
  - /var/www/<site_name>
  - /var/www/html/<site_name>
  - /opt/<site_name>