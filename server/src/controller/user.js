/**
 * user controller
 */
const collectionName = 'user'
const DB = require('../db.js')
// const BASE = require('../base.js')
const { ResultSuccessView, ResultFailView } = require('../result.js')
const Utils = require('../utils.js')

// 数据库的操作
const getList = async (ctx) => {
  let body = ctx.request.body || {}
  let params = {
    username: body.username,
    sex: body.sex,
    telephone: body.telephone,
    address: body.address,
    email: body.email
  }
  params = Utils.filterQuery(params)
  let doc = await DB.find(collectionName, params, {password: 0})
  let result = new ResultSuccessView(doc)
  ctx.status = 200
  ctx.body = result
}
const insertOne = async (ctx) => {
  let body = ctx.request.body || {}
  let params = {
    username: body.username,
    sex: body.sex,
    telephone: body.telephone,
    address: body.address,
    email: body.email
  }
  ctx.status = 200
  if (!params.username || !params.email) {
    ctx.body = new ResultFailView(-1, '用户名和邮箱不能为空')
    return
  }
  let doc = await DB.find(collectionName, {
    $or: [{'username': params.username, 'email': params.email}]
  })
  if (doc && doc.length !== 0) { // 怎么查邮箱或者用户名存在
    ctx.body = new ResultFailView(-1, '用户名或邮箱已存在')
    return
  }

  params = Utils.filterQuery(params)
  doc = await DB.insert(collectionName, params)
  ctx.status = 200
  try {
    if (doc.result.ok) {
      ctx.body = new ResultSuccessView()
    } else {
      ctx.body = new ResultFailView()
    }
  } catch (err) {
    ctx.body = new ResultFailView()
  }
}
module.exports = {
  getList,
  insertOne
}
