
>后台管理接口设计


表:

```
id，createTime, updateTime

1. 标签(Tag): name
2. 分类(category): name
3. 文章(Article): title, content, bannerImg, category, tags，show
```


# /admin/user/login

```
POST: username, password
```

>用户先在数据库创建个 admin

# /admin/menu

```
GET: 菜单列表(多级)
```

菜单:

```
分类：列表+增改
标签：列表+增改
文章：列表+增改
```

# Category

```
list: /admin/categories

Create: /admin/category POST
Update: /admin/category PUT
```

# Tag

```
list: /admin/tags

Create: /admin/tag POST
Update: /admin/tag PUT
```

# Article

```
list: /admin/articles

Create: /admin/article POST
Update: /admin/article PUT
```