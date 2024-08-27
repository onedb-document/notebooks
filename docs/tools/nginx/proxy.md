---
toc: menu
order: 6
---

# 代理、缓存设置

## proxy_pass 反向代理

该指令主要作用是用来设置被代理服务器地址的，可以说主机名称，IP 地址加端口的形式；其中 URL 表示被代理服务器的地址，包含协议、主机名或 IP 加端口、URI 等。传输协议通常是“http”或者"https"。

如果我们代理的是一组服务器时，我们可以用 upstream 指令把该组服务器同一归并为一个名称的组服务器组，当然这是我们后面要聊的 nginx 作为负载均衡的配置。

这里特别要说明的是 URL 中是否包含 URI，什么意思呢，就是 URL 不包含 URI 的意思就是 被代理的 URL 没有 URI，就只有协议 IP 地址或域名或主机名，这种就叫不带 URI；带 URI 就表示除了协议主机名或域名或 IP 地址外，后面还有 RUI；对于这两种情况 Nginx 处理逻辑上不一样的，如果 ULR 不包含 URI 那么 nginx 服务器不会改变源地址的 URI；如果 URL 包含 URI，nginx 服务器将会使用新的 URI 替换原来的 URI；

### 不带 URI

```bash
location /en/docs/ {
  proxy_set_header X-Real-IP  $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_pass http://127.0.0.1:8000;
}
```

> 注意，端口号后面即使带了"/"，也会被认为是一个 URI。

结果：Nginx 服务器会把用户请求的 URI 当作被代理服务器的 URI，即：用户访问www.test.com/en/docs/将被代理至http://127.0.0.1:8000/en/docs/

### 带 URI

```bash
location /test/ {
  proxy_set_header X-Real-IP  $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_pass http://127.0.0.1:8000/en/docs/;
}
```

结果：Nginx 服务器会把用户请求的 URI 替换成被代理的 URI，即：用户请求www.test.com/test/就会被代理至http://127.0.0.1:8000/en/docs/

### 使用正则

如果 location 定义 URI 时使用了正则，或在 if 语句或在 limit_execept 中使用了 proxy_pass 指令，则 proxy_pass 之后不能使用 URI。

### 小结

- 不想改变源请求的 URI，那么在后端代理时，proxy_pass 就不带 URI。
- 想更改源请求 URI，那么在后端代理时，proxy_pass 就带 URI。
- location 使用正则，proxy_pass 就不能带 URI。

## proxy_set_header 请求头

设定发往后端主机的请求报文的请求首部的值；可用在 http,server,location 配置段中

```bash
proxy_set_header X-Real-IP  $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

含义：

- 通过代理发送给后端主机时，在其请求头部加上 1、X-Real-IP 这个字段，并且这个字段的值是$remote_addr（客户端IP地址）；2、X-Forwarded-For字段，其值为$proxy_add_x_forwarded_for。
- $proxy_add_x_forwarded_for 这个变量是也是记录IP地址的，不同的是，这个变量它记录了客户端IP和代理服务端ip，两个IP分别用逗号隔开，如果没有代理服务器的场景，这个变量的意义同$remote_addr 是一样的，都是记录客户端客户端 IP

## 缓存

### proxy_cache_path

```bash
# 语法
proxy_cache_path path [levels=levels] [use_temp_path=on|off] keys_zone=name:size [inactive=time] [max_size=size] [manager_files=number] [manager_sleep=time] [manager_threshold=time] [loader_files=number] [loader_sleep=time] [loader_threshold=time] [purger=on|off] [purger_files=number] [purger_sleep=time] [purger_threshold=time];

# 示例
proxy_cache_path /opt/cache levels=1:2 keys_zone=mycache:10m max_size=2g inactive=60m use_temp_path=off;
```

含义：

- path：表示设置缓存数据存放路径，该路径必须事先存在；
- levels;表示设置存放缓存数据的目录级别，这个和前面说的 nginx 缓存目录一样。levels=1:2 表示两级目录，且一级目录是一个字符哈希目录，二级目录是两个字符的哈希目录，目录名称是基于 URL 哈希算法获取到的；
- keys_zone=name:size 表示设置缓存索引在内存区域的名称和大小；
- inactive=time 设置非活动缓存时间，在指定的时间内如果该缓存项没有被命中，nginx 就会强制把该缓存从磁盘上删除，如果下次有人访问时在缓存，依次循环；默认 10 分钟;
- max_size=size:设置磁盘中缓存数据的大小限制，当缓存数据超过我们设定的大小时，就是用 LRU 算法来删除缓存；
- loader_files=number:设置缓存索引重建进程每次加载的数据元素的数量上限；
- loader_sleep=time:设置缓存索引重建进程在一次遍历结束、下次遍历开始之间的暂停时长，默认是 50ms；
- loader_threshold=time:设置遍历一次磁盘缓存源数据的时间上限，默认设置为 200ms。

通常情况下我们不需要设置这么多选项，只需要把前三个选项设置好就行了，没有特殊的要求后面的选项我们用默认值就可以。

### proxy_cache zone | off

指明要调用的缓存，或关闭缓存机制；此指令可用于 http,server,location 配置段中。

### proxy_cache_key

定义缓存 key，默认是$scheme$proxy_host$request_uri，它这个默认就是缓存的 key 是协议加代理主机地址或主机名或 FQDN 和用户请求的 uri 当作缓存的 KEY；也就是说服务端怎么去找缓存的方式，对应 key 的定义。

### proxy_cache_methods

METHODS：定义缓存用户的请求方式，也就是说那些请求方法的资源我们要进行缓存，默认是 GET HEAD。

### proxy_cache_valid [code] time

定义不同的响应码的资源缓存时长。

### proxy_cache_use_stale error |timeout|

定义后端服务器基于那种状态使用缓存，默认是不基于后端服务器状态使用缓存；比如后端服务器发生错误，是否用缓存中的内容响应客户端？如果我们定义 proxy_cache_use_stale http 403 就表示后端服务器如果响应代理服务器 403，我们代理服务器就是用之前的缓存，响应客户端。

### 小结

示例：

```
server {
  server_name: www.test.com;

  proxy_cache proxy_cache;
  proxy_cache_key $request_uri;
  proxy_cache_methods GET HEAD;
  proxy_cache_valid 200 302 15m;
  proxy_cache_valid 404 1m;
  proxy_cache_use_stale http_500 http_502;

  location /en/docs/ {
    proxy_pass http://127.0.0.1:8000;
    proxy_redirect off;
    proxy_method POST;

  }
}

```

提示：以上配置表示使用 proxy_cache 缓存空间，缓存 key 是用户请求的 uri 进行缓存，对用户使用 GET 和 HEAD 方法请求的资源进行缓存，对响应码是 200 302 的资源缓存 15 分钟，对响应码是 404 的资源缓存 1 分钟，后端服务器出现 500 或 502 的错误，代理服务器使用以前的缓存响应客户端.

总结对于 nginx 的缓存，我们首先在 http 配置段定义一个缓存空间，然后在各 server 或 location 中调用我们定义的缓存空间，并明确说明各种响应码的资源缓存多长时间，对于 proxy_cache_key 和 proxy_cache_methods 是可以不指定的，不指定就代表使用默认值，从上面的配置我们其实就只定义响应码是多少的资源缓存多久，其他的按照默认来，它也是可以进行缓存的。

[参考文章](https://www.cnblogs.com/qiuhom-1874/p/12417130.html)

## 问题

### Post 请求变 Get 的问题

默认情况下 Nginx 会把 post 请求做一次重定向操作，然后后端收到的就成了 Get 请求，还会导致一些参数的遗漏。

解决办法：

```bash
proxy_redirect off;
```
