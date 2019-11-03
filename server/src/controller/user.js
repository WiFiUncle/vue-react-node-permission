/**
 * user controller
 */
const collectionName = 'user'
const DB = require('../db.js')
const { Config } = require('../base.js')
const { ResultSuccessView, ResultFailView } = require('../result.js')
const Utils = require('../utils.js')
const { USER_CODE, COMMON_CODE } = require('../code/index.js')

// const UserCol = require('../model/user.js')

const getTotal = async (query = {}) => {
  const q = JSON.parse(JSON.stringify(query)) //
  delete q.pageSize
  delete q.pageNo
  let doc = await DB.find(collectionName, q)
  let total = doc.length
  return total || 0
}
/**
 * showdoc
 * @catalog 用户管理
 * @title 获取/查询用户列表
 * @description 获取用户列表
 * @method get
 * @url /api/users
 * @param username 否  string 用户名
 * @param password 否  string 密码
 * @param name 可选 string 用户昵称
 * @return {"status":0,"message":"操作成功","data":{"list":[{"_id":"5db6b92922bb0081e0ebabb1","username":"wifi_uncle","telephone":"18866668888","email":"aaa@163.com"}],"total":1},"error":null,"createTime":"2019-10-30T05:48:16.928Z"}
 * @return_param _id string 用户id
 * @return_param username string 用户名
 * @return_param email string 邮箱
 * @return_param telephone string 联系方式
 * @return_param address string 联系地址
 * @remark 获取用户列表
 * @number 99
 */
const getList = async (ctx) => {
  let query = ctx.request.query
  let options = {
    projection: {isDeleted: 0, password: 0}
  }

  query.username = query.username ? new RegExp(query.username) : '' //  query.email = {'$regex': eval(`/${query.email}/`)} // 模糊查询
  query.email = query.email ? new RegExp(query.email) : ''
  query.telephone = query.telephone ? new RegExp(query.telephone) : ''
  query.address = query.address ? new RegExp(query.address) : ''
  // todo 输入字符需转义
  query = Utils.filterQuery(query)
  query.isDeleted = Config.NOT_DELETE // 过滤已删除
  let total = await getTotal(query)
  let doc = await DB.find(collectionName, query, options)
  let result = new ResultSuccessView({
    list: doc,
    total
  })
  ctx.body = result
}

/**
 * showdoc
 * @catalog 用户管理
 * @title 添加用户
 * @description
 * @method post
 * @url /api/users
 * @param username 必填  string 用户名
 * @param nickname 可选 string 昵称
 * @param email 必填 string 邮箱
 * @param telephone 可选 string 联系方式
 * @param address 可选 string 联系地址
 * @return {"status":0,"message":"操作成功","data":[{"_id":"5db256be99c05f5dc8f4ad8e","username":"zhangsan","telephone":"18866668888","address":"湖南省长沙市岳麓区XX街道","email":"wifi@163.com"}],"error":null,"createTime":"2019-10-25T01:59:50.919Z"}
 */
const insertOne = async (ctx) => {
  let body = ctx.request.body || {}
  let params = {
    username: body.username,
    nickname: body.nickname,
    telephone: body.telephone,
    address: body.address,
    email: body.email,
    password: Config.DEFAULT_PWD, // 默认123456
    isDeleted: Config.NOT_DELETE
  }
  if (!params.username) {
    ctx.body = new ResultFailView({...USER_CODE.NAME_IS_EMPTY})
    return
  }
  if (!params.email) {
    ctx.body = new ResultFailView({...USER_CODE.EMAIL_IS_EMPTY})
    return
  }
  // todo 邮箱验证、手机号码验证

  let doc = await DB.find(collectionName, {
    $or: [{'username': params.username}] //
  })
  if (doc && doc.length !== 0) {
    ctx.body = new ResultFailView({...USER_CODE.NAME_IS_EXIST})
    return
  }
  doc = await DB.find(collectionName, {
    $or: [{'email': params.email}] //
  })
  if (doc && doc.length !== 0) {
    ctx.body = new ResultFailView({...USER_CODE.EMAIL_IS_EXIST})
    return
  }

  params = Utils.filterQuery(params)
  doc = await DB.insert(collectionName, params)
  // doc = await UserCol.create(body, function (err, user) { // 异步操作
  //  if (!err) {
  try {
    if (doc.result.ok) {
      ctx.body = new ResultSuccessView()
    } else {
      ctx.body = new ResultFailView({...USER_CODE.INSERT_FAIL})
    }
  } catch (err) {
    ctx.body = new ResultFailView({...USER_CODE.COMMON, error: err})
  }
  //  } else {
  //    ctx.body = new ResultFailView({...USER_CODE.COMMON, error: err})
  //  }
  // })
}

/**
 * showdoc
 * @catalog 用户管理
 * @title 修改用户
 * @description
 * @method put
 * @url /api/users/:id
 * @param username 可选  string 用户名
 * @param nickname 可选 string 昵称
 * @param email 可选 string 邮箱
 * @param telephone 可选 string 联系方式
 * @param address 可选 string 联系地址
 * @return {"status":0,"message":"操作成功","data":[{"_id":"5db256be99c05f5dc8f4ad8e","username":"zhangsan","telephone":"18866668888","address":"湖南省长沙市岳麓区XX街道","email":"wifi@163.com"}],"error":null,"createTime":"2019-10-25T01:59:50.919Z"}
 */
const updateOne = async (ctx) => {
  const body = ctx.request.body || {}
  const id = ctx.params.id // 获取路由参数
  if (!id) {
    ctx.body = new ResultFailView({...USER_CODE.ID_IS_EMPTY})
    return
  }
  if (!Utils.verifyId(id)) {
    ctx.body = new ResultFailView({...COMMON_CODE.INVALID_ID})
    return
  }
  let params = {
    username: body.username,
    nickname: body.nickname,
    telephone: body.telephone,
    address: body.address,
    email: body.email
  }
  params = Utils.filterQuery(params)
  // 先判断用户是否存在
  let doc = await DB.update(collectionName, {'_id': DB.getObjectId(id)}, params)
  try {
    if (doc.result.ok) {
      ctx.body = new ResultSuccessView()
    } else {
      ctx.body = new ResultFailView({...USER_CODE.UPDATE_FAIL})
    }
  } catch (err) {
    ctx.body = new ResultFailView({...USER_CODE.COMMON, error: err})
  }
}

/**
 * showdoc
 * @catalog 用户管理
 * @title 删除用户
 * @description
 * @method delete
 * @url /api/users/:id
 * @param id 必填  string 用户id
 * @return {"status":0,"message":"操作成功","data": null,"error":null,"createTime":"2019-10-25T01:59:50.919Z"}
 */
const deleteOne = async (ctx) => {
  const id = ctx.params.id // 获取路由参数
  if (!id) {
    ctx.body = new ResultFailView({...COMMON_CODE.ID_IS_EMPTY})
    return
  }
  if (!Utils.verifyId(id)) {
    ctx.body = new ResultFailView({...COMMON_CODE.INVALID_ID})
    return
  }
  // 逻辑删除，标记位
  let doc = await DB.update(collectionName, {'_id': DB.getObjectId(id)}, {isDeleted: Config.IS_DELETED})

  // let doc = await DB.remove(collectionName, {'_id': DB.getObjectId(id)})
  try {
    if (doc.result.ok) {
      ctx.body = new ResultSuccessView()
    } else {
      ctx.body = new ResultFailView({...USER_CODE.UPDATE_FAIL})
    }
  } catch (err) {
    ctx.body = new ResultFailView({...USER_CODE.COMMON, error: err})
  }
}

/**
 * showdoc
 * @catalog 用户管理
 * @title 获取用户详情
 * @description
 * @method get
 * @url /api/users/:id
 */
const getInfo = async (ctx) => {
  const id = ctx.params.id // 获取路由参数
  if (!id) {
    ctx.body = new ResultFailView({...USER_CODE.ID_IS_EMPTY})
    return
  }
  if (!Utils.verifyId(id)) {
    ctx.body = new ResultFailView({...COMMON_CODE.INVALID_ID})
    return
  }
  let options = {
    projection: {isDeleted: 0, password: 0}
  }
  let doc = await DB.find(collectionName, {'_id': DB.getObjectId(id)}, options)
  try {
    if (doc) {
      ctx.body = new ResultSuccessView(doc[0])
    } else {
      ctx.body = new ResultFailView({...USER_CODE.SEARCH_FAIL})
    }
  } catch (err) {
    ctx.body = new ResultFailView({...USER_CODE.COMMON, error: err})
  }
}

module.exports = {
  getList,
  insertOne,
  updateOne,
  deleteOne,
  getInfo
}
