/* 配置文件 */

const DEBUG = 0
const DB_SERVER = ['//localhost:27017/', '//39.97.232.213:27017/'][DEBUG]
const dbName = 'my-app'
const dbConfig = {
  dbUrl: 'mongodb:' + DB_SERVER,
  dbName: dbName
}
module.exports = dbConfig
