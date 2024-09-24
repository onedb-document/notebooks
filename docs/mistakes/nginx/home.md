# nginx

## 语法相关

### if 语句和括号之间必须有空格

今天修改配置部署 nginx 的时候发现报错：`nginx: [emerg] unknown directive "if("`

检查了好几遍，配置文件也找不到问题所在。最后才发现原来是 if 和“(”之间必须有个空格，如下图：

```
        if( $host = www.readers.fun ){ // [!code --]
        if ( $host = www.readers.fun ){ // [!code ++]
            proxy_pass $prod_target;
        }
        if( $host = test.readers.fun ){ // [!code --]
        if ( $host = test.readers.fun ){ // [!code ++]
            proxy_pass $test_target;
        }
```

添加空格之后，问题解决
