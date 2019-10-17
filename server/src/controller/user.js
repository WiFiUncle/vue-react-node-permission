const collectionName = 'user';
const DB = require('../db.js');
const BASE = require('../base.js');
const COMMON = require('../common.js');
const createToken = require('../token/createToken.js');

//数据库的操作

//登录
const login = async ( ctx ) => {
  //拿到账号和密码
  console.log(ctx.request.body)
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;//sha1(ctx.request.body.password);
  let result = BASE.Result.getResult();
  var doc = await DB.find('user',{username,password });
  doc = doc[0];
  if(!doc){
    console.log('检查到用户名不存在');
    ctx.status = 200;
    result.status = -1;
    result.message = "用户名不存在"
    ctx.body = result;
  }else if(doc.password === password){
    console.log('密码一致!');

    //生成一个新的token,并存到数据库
    let token = createToken(username);
    console.log(token);
    ctx.status = 200;
    delete doc.password;
    doc.token = token;
    result.data = doc;
    ctx.body = result
  }else{
    console.log('密码错误!');
    console.log(doc)
    ctx.status = 200;
    result.status = -1;
    result.message = "密码错误";
    ctx.body = result;
  }
};
module.exports = {
  login,
};
