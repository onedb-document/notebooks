---
toc: menu
order: 3
---

# 常见问题

## alpine 安装慢 apk add 很慢

很多情况下，会使用轻量级的基础镜像 alpine，但是在安装应用的时候很慢，造成这种情况是网络原因，解决办法是切换源：

- 阿里镜像
  ```
  sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
  ```
- 科大镜像
  ```
  sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
  ```

_或者使用 github actions 进行构建，完美避开这种问题 😺_

## 同时使用了 element-ui 和 ant-design 产生打包问题

如果是本地打包的话，直接修改 node_modules 下面对应的文件即可。

但我们的目标是使用 Dockfile 自动化构建，解决办法是使用 linux 的`sed`命令操作文件，把有问题的代码注释即可，可以参考示例：

```bash
# 解决element-ui和ant-design的声明冲突问题
RUN sed -i "s/\$confirm/\/\/\$confirm/g" /app/node_modules/ant-design-vue/types/modal.d.ts
RUN sed -i "s/\$message/\/\/\$message/g" /app/node_modules/ant-design-vue/types/message.d.ts
```

解释：

- 代码在`npm run build`之前执行
- 把对应文件的`$confirm`替换为`//$confirm`，达到注释的效果
- 把对应文件的`$message`替换为`//$message`，达到注释的效果
- 对应的文件路径，根据自己的时机情况，进行替换，我这里是`/app/node_modules/ant-design-vue/types/modal.d.ts`和`/app/node_modules/ant-design-vue/types/message.d.ts`
- `sed -i "s/old/new/g" filepath`命令，是 linux 的 sed 的其中一种用法，是文件里全局替换 old 为 new。
  可以参考：[https://www.runoob.com/linux/linux-comm-sed.html](https://www.runoob.com/linux/linux-comm-sed.html)
