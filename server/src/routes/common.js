/**
 * Created By wifi_uncle on 2019/10/23
 */
const Router = require('koa-router')

const CommonController = require('../controller/common.js')
const childRouter = new Router()
childRouter.post('/login', CommonController.login)

module.exports = childRouter
