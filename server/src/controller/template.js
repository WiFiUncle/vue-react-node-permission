/**
 * 通用controller
 * 登录/找回密码等
 */

const collectionName = 'user'
const DB = require('../db.js')
const ResultView = require('../result.js')
const createToken = require('../token/create-token.js')

// 数据库的操作

// 登录
const login = async (ctx) => {
  // 拿到账号和密码
  let username = ctx.request.body.username
  let password = ctx.request.body.password// sha1(ctx.request.body.password);
  let result = new ResultView()
  let doc = await DB.find(collectionName, {
    username
  })
  doc = doc[0]
  ctx.status = 200
  if (!doc) {
    ctx.body = result.resultFailView(-1, '用户名不存在')
  } else if (doc.password === password) {
    // 生成一个新的token,并存到数据库
    let token = createToken(username)
    delete doc.password
    doc.token = token
    ctx.body = result.resultSuccessView(doc)
  } else {
    ctx.body = result.resultFailView(-1, '密码错误')
  }
}
module.exports = {
  login
}
