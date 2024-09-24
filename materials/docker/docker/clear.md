---
toc: menu
order: 9
---

# 清理技巧

## 删除所有的容器

```bash
docker rm $(docker ps -a -q)
```

## 删除所有镜像

```bash
docker rmi $(docker images -q)
```

## 删除所有"label=target=documents"的容器

```bash
docker rm -f $(docker ps -a --filter "label=target=documents" -q)
```

## 删除所有未打 dangling 标签的镜像

```bash
docker rmi $(docker images -q -f dangling=true)
```

## 创建命令别名

```bash
# ~/.bash_aliases
# 删除所有的容器
alias dockercleanc='docker rm $(docker ps -a -q)'
```

参考：[https://www.runoob.com/w3cnote/docker-tricks.html](https://www.runoob.com/w3cnote/docker-tricks.html)
