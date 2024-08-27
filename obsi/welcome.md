## 待办项目

```dataview
TABLE WITHOUT ID
  file.link as "文件名称",
  tags as "状态",
  description as "描述",
  remark as "备注",
  dateformat(dueDate,"yyyy-MM-dd") as "截止日期"
FROM "docs/projects"
WHERE contains(tags,"status_init")
SORT tags ASC
```
