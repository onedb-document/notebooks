---
toc: menu
order: 3
---

# 镜像加速

## 选择加速地址

- 科大镜像：https://docker.mirrors.ustc.edu.cn/
- 网易：https://hub-mirror.c.163.com/
- ..

## widnows 系统  
  在 docker desktop 中，“设置”-“docker engine”-编辑“registry-mirrors”

  ``` shell
  {
    "registry-mirrors": [
      "https://hub-mirror.c.163.com/"
    ]
  }
  ```

## Ubuntu16.04+、Debian8+、CentOS7

  - 在/etc/docker/daemon.json 中，写入：

  ```shell
  {"registry-mirrors":["https://hub-mirror.c.163.com/"]}
  ```

  - 重启服务

  ```shell
  sudo systemctl daemon-reload
  sudo systemctl restart docker
  ```

  - 验证生效:执行`docker info`，如果出现如下内容，说明配制成功

  ```shell
  docker info
  Registry Mirrors:
    https://reg-mirror.qiniu.com
  ```
