/**
 * Created By wifi_uncle on 2019/10/25
 */
const { USER_CODE_PREFIX } = require('./first-level.js')
const { SECOND_LV } = require('./second-level.js')

const USER_CODE = {
  COMMON: {
    status: USER_CODE_PREFIX + SECOND_LV.COMMON + '00',
    msg: '操作失败'
  },
  NAME_IS_EMPTY: {
    status: USER_CODE_PREFIX + SECOND_LV.MISS_PARAMS + '01',
    msg: '用户名不能为空'
  },
  EMAIL_IS_EMPTY: {
    status: USER_CODE_PREFIX + SECOND_LV.MISS_PARAMS + '02',
    msg: '邮箱不能为空'
  },
  NAME_IS_EXIST: {
    status: USER_CODE_PREFIX + SECOND_LV.IS_EXIST + '03',
    msg: '用户名已存在'
  },
  EMAIL_IS_EXIST: {
    status: USER_CODE_PREFIX + SECOND_LV.IS_EXIST + '04',
    msg: '邮箱已存在'
  },
  ID_IS_EMPTY: {
    status: USER_CODE_PREFIX + SECOND_LV.IS_EMPTY + '05',
    msg: 'ID不能为空'
  },
  INSERT_FAIL: {
    status: USER_CODE_PREFIX + SECOND_LV.INSERT_FAIL + '06',
    msg: '新增用户信息失败'
  },
  UPDATE_FAIL: {
    status: USER_CODE_PREFIX + SECOND_LV.UPDATE_FAIL + '07',
    msg: '更新用户信息失败'
  },
  DELETE_FAIL: {
    status: USER_CODE_PREFIX + SECOND_LV.DELETE_FAIL + '08',
    msg: '删除用户信息失败'
  },
  SEARCH_FAIL: {
    status: USER_CODE_PREFIX + SECOND_LV.SEARCH_FAIL + '09',
    msg: '获取用户列表失败'
  }
}
module.exports = {
  USER_CODE
}
