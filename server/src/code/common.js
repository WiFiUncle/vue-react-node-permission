/**
 * Created By wifi_uncle on 2019/10/25
 */
const { COMMON_CODE_PREFIX } = require('./first-level.js')
const { SECOND_LV } = require('./second-level.js')
const COMMON_CODE = {
  PWD_IS_ERROR: {
    status: COMMON_CODE_PREFIX + SECOND_LV.COMMON + '01',
    msg: '密码错误'
  },
  NAME_IS_NOT_EXIST: {
    status: COMMON_CODE_PREFIX + SECOND_LV.COMMON + '02',
    msg: '用户名不存在'
  },
  ID_IS_EMPTY: {
    status: COMMON_CODE_PREFIX + SECOND_LV.IS_EMPTY + '03',
    msg: 'id不能为空'
  },
  INVALID_ID: {
    status: COMMON_CODE_PREFIX + SECOND_LV.TYPE_INVALID + '04',
    msg: '非法id'
  }
}
module.exports = {
  COMMON_CODE
}
