
## 正在开发中····
## 项目描述
   该demo是一套整套权限管理系统，通过后端配置，可以实现用户的菜单权限/按钮权限/接口权限的控制。

  
## 技术栈
#### 后端 node + koa2   
#### 前端

**vue版本:** vue + vuex + router +axios + element UI


**react版本:** react + antd + (dva)

## 权限处理概述
 
用户分配角色，角色关联权限(api权限/菜单权限/按钮)
1. 定义前端权限映射表
2. 菜单管理 新增所有菜单和按钮录入数据库
3. 给角色分配权限(具体是菜单和按钮)
4. 给用户分配角色(此时用户已关联菜单和按钮)
5. 用户登录时，获取用户权限
6. 拿到的菜单list渲染菜单，拿到按钮权限值
7. 页面按钮比匹配用户是否有该按钮权限值，有则渲染

**先约定映射表定义规则**

    菜单以 小写m开头，后面是模块，下划线连接，
    按钮b开头，中间是模块名，尾部是按钮操作名。下划线连接
    用户菜单:  m_user
    用户管理新增权限: b_user_add
    
举个栗子:


1.  定义个permission.js
```js
{
  user: {
    add: 'b_user_add',
    update: 'b_user_update'
  }
}
```  
2. 菜单管理中，录入用户管理菜单和新增按钮(包括b_user_add)
3. 给"管理员" 分配用户菜单和新增按钮的权限
4. 给小A分配"管理员"角色
此时的小A有了"用户管理"的菜单和"新增按钮"
5. 小A登录后，获取到"用户管理"的菜单和"新增按钮"
6. 
    a. 菜单直接渲染
    b. 用户管理页面新增的按钮对小A的权限做判断，
    有b_user_add权限值则显示该按钮，没有则不渲染。
 (vue 设置自定义指令v-has  react  权限 && 按钮)   


## 错误码定义说明

### 全局验证码

#### 命名规则: 一级错误码(2位数) + 二级错误码(2位数) + 具体错误码(2位数)

#### 一级错误码
| 一级错误码  | 名称  | 关键字| 备注|
| ---- | ------  | ----| ----|
|  01 | 通用类  | |
|  02 | 用户类  | |
|  03 | 角色类  | |
|  04 | 菜单类  | |

first-level.js


### 细分错误码

| 二级错误码  | 名称  | 关键字| 备注|
| ---- | ------  | ----| ----|
|  00 |  通用 |   | |
|  01 | 参数缺失  | MISS_PARAMS| |
|  02 | 字段类型错误 | TYPE_INVALID | |
|  03 | 字段值不能为空  | IS_EMPTY | |
|  04 | 字段值已存在  | IS_EXIST| |
|  05 | 新增数据失败  | INSERT_FAIL | |
| 06 | 更新数据失败  | UPDATE_FAIL | |
| 07 | 删除数据失败  | DELETE_FAIL | |
| 08 | 获取数据失败  | SEARCH_FAIL | |

[详细](https://github.com/WiFiUncle/vue-react-node-permission/blob/master/server/src/code/错误码定义说明.md)








## react-permission

http://localhost:3000/

## vue-permission

http://localhost:8081/

## node-server

http://localhost:8082/

## 一键生成接口文档
使用showdoc配合响应注释，双击/server/src/showdoc_api.sh

### 接口文档
https://www.showdoc.cc/nodePermission


`npm install -g koa-generator`




