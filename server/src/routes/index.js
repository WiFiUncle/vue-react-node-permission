const Router = require('koa-router')
const router = new Router()
const UserController = require('../controller/user.js');
//引入子路由
 const userRouter = require('./user.js');

//装载子路由
router.use('/api', userRouter.routes(), userRouter.allowedMethods());

//router.post('/login', UserController.login);
module.exports = router
