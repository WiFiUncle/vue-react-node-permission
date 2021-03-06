/**
 * Created By wifi_uncle on 2019/10/23
 */
const DB = require('./db.js')
const moment = require('moment')
const FORMAT = 'YYYY-MM-DD HH:MM:SS'
const Utils = {
  /**
   * 过滤空字段 (null/ '' / undefined)
   * @param query
   */
  filterQuery (query = {}) {
    let val = ''
    Object.keys(query).forEach((key, index) => {
      val = query[key]
      if (val === null || val === undefined || val === '') {
        delete query[key]
      }
    })
    return query
  },
  /**
   * 验证id的合法性
   * objectId
   */
  verifyId (objectId) {
    try {
      DB.getObjectId(objectId)
      return true
    } catch (e) {
      return false
    }
  },
  getTime (format = FORMAT) {
    let date = moment().format()
    return date
  }
}
module.exports = Utils
