const Router = require('koa-router')
const UserController = require('../controller/user.js')
const childRouter = new Router()
// childRouter.prefix('/users')
childRouter
  .get('/users', UserController.getList)
  .post('/users', UserController.insertOne)
  .delete('/users/:id', UserController.deleteOne)
  .put('/users/:id', UserController.updateOne)
  .get('/users/:id', UserController.getInfo)
module.exports = childRouter
