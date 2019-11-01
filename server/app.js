const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = require('./src/routes')
const cors = require('koa2-cors')
const Config = require('./src/config.js')
app.use(cors({
  origin: function (ctx) {
    return '*' // 允许来自所有域名请求
    // return 'http://localhost:8999'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 配置post提交数据的中间件
app.use(bodyParser())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(Config.SERVER_PORT, () => {
  console.log('The serverBack is running at http://localhost:' + Config.SERVER_PORT)
})
