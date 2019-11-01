

### mongoose 是什么？ 怎么用
mongoose 类似于model

#### 用法

相关文档: 
https://mongoosejs.com/docs/index.html
http://www.nodeclass.com/api/mongoose.html

https://www.cnblogs.com/chris-oil/p/9426270.html
https://www.jb51.net/article/103826.htm

### mongoDB 分页查询

```js
        // 每页5条，查询第2页
        const pageSize = 5;
        const pageNo = 2;
        // const result = db.collection(collectionName).find(json).limit(limit).skip(skip)
        const result = db.collection(collectionName).find(json, {
          limit: pageSize,
          skip: pageSize * pageNo
        })
// 具体用法参考文档
// http://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#find
```

### 获取get/post的参数
```
const username = ctx.body.username // POST


localhost:8082/api/users/:id
const id = ctx.params.id //GET

``` 

### 查询列表 过滤某个字段

```js

let options = {
    projection: {password: 0}
}

 db.collection('user').find({}, options)
// 具体用法参考文档
// http://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#find
```

### mongodb nodejs 使用变量模糊查询
```js
 query.username = new RegExp(query.username)

 query.username = {'$regex': eval(`/${query.username}/`)} // 不推荐

```


