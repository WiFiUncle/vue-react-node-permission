const Router = require('koa-router')
const UserController = require('../controller/user.js')
const childRouter = new Router()
childRouter.prefix('/user')
childRouter.post('/list', UserController.getList)

module.exports = childRouter
