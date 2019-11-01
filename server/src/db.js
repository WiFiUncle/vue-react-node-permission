/**
 * http://mongodb.github.io/node-mongodb-native
 * http://mongodb.github.io/node-mongodb-native/3.3/api/
 */

// DB库
const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
const ObjectID = MongoDB.ObjectID
const assert = require('assert')
const Config = require('./dbConfig.js')
const mongoose = require('mongoose')
const moment = require('moment')
const LIMIT = 100
const FORMAT = 'YYYY-MM-DD HH:MM:SS'
const getTime = (format = FORMAT) => {
  let date = moment().format(format)
  return date
}
mongoose.connect(Config.dbUrl + Config.dbName, {useNewUrlParser: true}, function (err) {
  if (err) {
    console.log('Connection Error:' + err)
  } else {
    console.log('Connection success!')
  }
})
// Create a new MongoClient
const client = new MongoClient(Config.dbUrl)

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err)
  console.log('Connected successfully to server')
  // const db = client.db(Config.dbName);
  client.close()
})

class Db {
  static getInstance () { /* 1、单例  多次实例化实例不共享的问题 */
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }
  constructor () {
    this.dbClient = '' /* 属性 放db对象 */
    this.connect() /* 实例化的时候就连接数据库 */
  }
  connect () { /* 连接数据库 */
    let _that = this
    return new Promise((resolve, reject) => {
      if (!_that.dbClient) { /* 1、解决数据库多次连接的问题 */
        MongoClient.connect(Config.dbUrl, (err, client) => {
          if (err) {
            reject(err)
          } else {
            _that.dbClient = client.db(Config.dbName)
            resolve(_that.dbClient)
          }
        })
      } else {
        resolve(_that.dbClient)
      }
    })
  }
  // https://docs.mongodb.com/manual/tutorial/query-documents/
  // http://mongodb.github.io/node-mongodb-native/3.3/api/BulkOperationBase.html#find
  find (collectionName, json, options = {}) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        json.pageNo = json.pageNo || '1'
        const limit = parseInt(json.pageSize) || LIMIT
        const skip = parseInt(json.pageSize) * (parseInt(json.pageNo) - 1) || 0
        delete json.pageSize
        delete json.pageNo
        options.sort = options.sort ? options.sort : {'createTime': 1}
        // const result = db.collection(collectionName).find(json, options).limit(5).skip(5)
        const result = db.collection(collectionName).find(json, {
          limit: limit,
          skip: skip
        }) // 都可以分页
        result.toArray(function (err, docs) {
          if (err) {
            reject(err)
            return
          }
          resolve(docs)
        })
      })
    })
  }
  // findOne(collectionName,json) {
  //   return new Promise((resolve,reject)=>{
  //     this.connect().then((db)=>{
  //       var result = db.collection(collectionName).find(json);
  //       result.toArray(function(err,docs){
  //         if(err){
  //           reject(err);
  //           return;
  //         }
  //         resolve(docs);
  //       })
  //     })
  //   })
  // }
  update (collectionName, json1 = {}, json2 = {}) {
    json2.modifyTime = getTime()
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        // db.user.update({},{$set:{}})
        db.collection(collectionName).updateOne(json1, {
          $set: json2
        }, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  insert (collectionName, json) {
    json.createTime = getTime()
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).insertOne(json, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  insertMany (collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).insertMany(json, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  remove (collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).removeOne(json, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  getObjectId (id) { /* mongodb里面查询 _id 把字符串转换成对象 */
    return new ObjectID(id)
  }
}

module.exports = Db.getInstance()
