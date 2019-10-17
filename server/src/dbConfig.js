/**
 * Created by Administrator on 2018/3/17 0017.
 */
/*配置文件*/

var DEBUG = 1;
const DB_SERVER = ['//39.97.232.213:27017/', "//localhost:27017/"][DEBUG];
var dbConfig = {
    dbUrl: 'mongodb:' + DB_SERVER,
    dbName: 'my-app'
}
module.exports = dbConfig;
