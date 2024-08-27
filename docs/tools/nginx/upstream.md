---
toc: menu
order: 6
---

# 负载均衡

## 启用负载均衡

需要定义以下两个段：upstream 和 server，请参考示例：

```bash
http {
    upstream backend {
       server 10.1.0.101;
       server 10.1.0.102;
       server 10.1.0.103;
    }

    #该服务器接受到端口80的所有流量并将其传递给上游upstream 。
    #请注意，upstream名称和proxy_pass需要匹配。
    server {
       listen 80;
        location / {
           proxy_pass http://backend;
       }
    }
 }
```

## 几种方法

### 轮询

如果没有定义其他方法，默认情况下 nginx 负载均衡会使用循环算法，如上面的第一个示例所示。

### 最少连接

基于最少连接的负载均衡是另一种简单的方法。顾名思义，此方法将请求定向到当时具有最少活动连接的服务器。对于请求有时可能需要更长时间才能完成的应用程序，它比循环法更有效。

```bash
upstream backend {
    least_conn;
    server 10.1.0.101;
    server 10.1.0.102;
    server 10.1.0.103;
}
```

### ip_hash | 会话持久性

虽然循环和最少连接平衡方案是公平的并且有其用途，但是它们不能提供会话持久性。如果您的 Web 应用程序要求用户随后被定向到与之前连接相同的后端服务器，则应使用 IPhash 方法。IPhash 使用访问者 IP 地址作为密钥来确定应选择哪个主机来为请求提供服务。这允许访问者每次被定向到同一服务器。

```bash
upstream backend {
    ip_hash;
    server 10.1.0.101;
    server 10.1.0.102;
    server 10.1.0.103;
}
```

### 权重

在一组主机之间的可用资源不相等的服务器配置中，可能希望某些服务器优先于其它服务器。定义服务器权重允许您进一步微调 nginx 负载均衡。负载均衡中权重最高的服务器最常选择。

```bash
upstream backend {
    server 10.1.0.101 weight=4;
    server 10.1.0.102 weight=2;
    server 10.1.0.103;
}
```

## 健康检查

max_fails、fail_timeout：

```bash
upstream backend {
    server 10.1.0.101 weight=5;
    server 10.1.0.102 max_fails=3 fail_timeout=30s;
    server 10.1.0.103;
}
```

为了知道哪些服务器可用，nginx 的反向代理实现包括被动服务器健康检查。如果服务器无法响应请求或回复错误，nginx 会检测到服务失败，并将尝试一段时间内避免转发请求到该服务器。

通过将参数 max_fails 设置为服务器行，可以在负载均衡器配置文件中定义特定时间段内连续不成功的连接尝试次数。默认情况下，如果未指定 max_fails，则将此值设置为 1.（可选）将 max_fails 设置为 0 将禁用对该服务器的运行状况检查。

如果将 max_fails 设置为大于 1 的值，则后续失败必须在特定时间范围内发生，以便无法计数。此时间范围由参数 fail_timeout 指定，该参数还定义服务器应被视为失败的时间。默认情况下，fail_timeout 设置为 10 秒。

在服务器标记失败并且 fail_timeout 设置的时间已过后，nginx 将开始使用客户端请求正常探测服务器。如果探测返回成功，则服务器再次标记为可用并且正常包含在负载平衡中。

[参考文章 1](https://www.jianshu.com/p/b1e248acba35)

[参考文章 2](https://www.nginx.cn/4996.html)
