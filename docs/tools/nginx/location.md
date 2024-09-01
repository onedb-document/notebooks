# location

## 官方文档

[官方文档](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)

## 总结

文档有点多，有很多概念

- "普通 location"：以“ = ”或“ ^~ ”为前缀或者没有任何前缀的 /uri/
- "正则 location"：是以“ ~ ”或“ ~\* ”为前缀的 /uri/
- "^~"："非正则，不需要继续正则匹配"，告诉 nginx 某条普通 location ，无论最大前缀匹配，还是严格精确匹配都终止继续搜索正则 location。
- "="：普通 location 不允许“最大前缀”匹配结果，必须严格等于，严格精确匹配。
- ...

简单概括：先匹配普通，再匹配正则。“正则 location ”让步 “普通 location”的严格精确匹配结果；但覆盖 “普通 location ”的最大前缀匹配结果。

## 正则 location 与编辑顺序

location 的指令与编辑顺序无关，这句话不全对。

对于普通 location 指令，匹配规则是：最大前缀匹配（与顺序无关），如果恰好是严格精确匹配结果或者加有前缀“ ^~ ”或“ = ”（符号“ = ”只能严格匹配，不能前缀匹配），则停止搜索正则 location 。

但对于正则 location 的匹配规则是：按编辑顺序逐个匹配（与顺序有关），只要匹配上，就立即停止后面的搜索。

[参考文章](https://www.cnblogs.com/lidabo/p/4169396.html)
