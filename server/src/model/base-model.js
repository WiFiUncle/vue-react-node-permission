/**
 * Created By wifi_uncle on 2019/10/25
 */
// 未用
class BaseModel {
  constructor () {
    this.createTime = new Date()
    this.modifyTime = new Date()
    this.isDeleted = 0
  }
}

module.exports = {
  BaseModel
}
