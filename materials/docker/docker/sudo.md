---
toc: menu
order: 2
---

# sudo 权限

解决每次运行 docker 命令，都要输入 sudo 的问题：

## 添加 docker 用户组

```bash
sudo groupadd docker
```

会显示：`groupadd: group 'docker' already exists`

## 将登录用户加入到 docker 用户组

```bash
sudo gpasswd -a $USER docker
```

## 更新用户组

```bash
newgrp docker
```

## 重启 docker

```bash
sudo service docker restart
```

## 问题

如果出现问题的话，可以试一试：

- 重启电脑。
- 编辑 sudoers：`vim /etc/sudoers`，手动添加 docker 组权限。
