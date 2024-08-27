
```dataview
TABLE WITHOUT ID
  file.link as "文件名称",
  tags as "状态",
  description as "描述",
  dateformat(dueDate,"yyyy-MM-dd") as "截止日期"
FROM "docs/projects"
WHERE contains(tags,"status/init")
SORT tags ASC
```
