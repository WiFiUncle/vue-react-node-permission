const Router = require('koa-router');
const UserController = require('../controller/user.js');
const childRouter = new Router();
childRouter.post('/login', UserController.login);
module.exports = childRouter;

