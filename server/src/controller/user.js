/**
 * user controller
 */
const collectionName = 'user'
const DB = require('../db.js')
// const BASE = require('../base.js')
const ResultView = require('../result.js')

// 数据库的操作

const getList = async (ctx) => {
  let body = ctx.request.body || {}
  let params = {
    username: body.username || '',
    sex: body.sex || '',
    telephone: body.telephone || '',
    address: body.address || '',
    email: body.email || ''
  }
  let doc = await DB.find(collectionName, params) // 过滤没有？？ 位置
  for (let i = 0; i < doc.length; i++) {
    delete doc[i].password
  }
  let result = (new ResultView()).resultSuccessView(doc)
  ctx.status = 200
  ctx.body = result
}
module.exports = {
  getList
}
