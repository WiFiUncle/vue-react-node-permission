/**
 * 通用controller
 * 登录/找回密码等
 */
const collectionName = 'user'
const DB = require('../db.js')
const { ResultSuccessView, ResultFailView } = require('../result.js')
const createToken = require('../token/create-token.js')
const { COMMON_CODE } = require('../code/index.js')
const {IS_DELETED} = require('../config')
// 数据库的操作

// 登录
const login = async (ctx) => {
  // 拿到账号和密码
  let username = ctx.request.body.username
  let password = ctx.request.body.password// sha1(ctx.request.body.password);
  let doc = await DB.find(collectionName, {
    username
  })
  doc = doc[0]
  if (!doc || doc.isDeleted === IS_DELETED) {
    ctx.body = new ResultFailView({...COMMON_CODE.NAME_IS_NOT_EXIST})
  } else if (doc.password === password) {
    // 生成一个新的token,并存到数据库
    let token = createToken(username)
    delete doc.password
    doc.token = token
    ctx.body = new ResultSuccessView(doc)
  } else {
    ctx.body = new ResultFailView({...COMMON_CODE.PWD_IS_ERROR})
  }
}
module.exports = {
  login
}
