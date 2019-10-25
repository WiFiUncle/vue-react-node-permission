/**
 * 细分错误码
 * Created By wifi_uncle on 2019/10/25
 */
const SECOND_LV = {
  COMMON: '00', // 通用 未分类
  MISS_PARAMS: '01', // 参数缺失
  TYPE_INVALID: '02', // 类型错误
  IS_EMPTY: '03',
  IS_EXIST: '04',
  INSERT_FAIL: '05', // 新增数据失败
  UPDATE_FAIL: '06',
  DELETE_FAIL: '07',
  SEARCH_FAIL: '08' // 获取列表
}
module.exports = {
  SECOND_LV
}
