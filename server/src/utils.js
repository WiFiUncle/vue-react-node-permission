/**
 * Created By wifi_uncle on 2019/10/23
 */
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
  }
}
module.exports = Utils
