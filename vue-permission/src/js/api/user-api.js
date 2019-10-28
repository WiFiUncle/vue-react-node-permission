
import AUTH_PRE from './api-pre'
const module = '/users'
const prefix = AUTH_PRE + module
export default {
  LOGIN: AUTH_PRE + '/login',
  /**
   * 获取列表
   */
  // GET_USER_LIST: prefix + '/list',
  GET_USER_LIST: prefix,

  /**
   * 添加
   */
  // ADD_USER: prefix + '/add',
  ADD_USER: prefix + '',

  /**
   * 删除
   */
  // DELETE_USER: prefix + '/delete/',
  DELETE_USER: prefix + '/',

  /**
   * 更新
   */
  // UPDATE_USER: prefix + '/update',
  UPDATE_USER: prefix + '/',

  /**
   * 获取详情
   */
  // GET_USER_INFO: prefix + '/'
  GET_USER_INFO: prefix + '/'
}
