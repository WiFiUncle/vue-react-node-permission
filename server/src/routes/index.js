const router = require('koa-router')()

// 引入子路由
const userRouter = require('./user.js')
const commonRouter = require('./common.js')

// 装载子路由
router.use('/api', userRouter.routes(), userRouter.allowedMethods())
  .use('', commonRouter.routes(), commonRouter.allowedMethods())
module.exports = router
