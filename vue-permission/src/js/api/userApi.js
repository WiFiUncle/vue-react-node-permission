
import AUTH_PRE from './apiPre';
const module =  '/user';
const prefix = AUTH_PRE + module;
export default {
  LOGIN: AUTH_PRE + '/login',
  /**
   * 获取列表
   */
  GET_USER_LIST: prefix + '/list',
  /**
   * 添加
   */
  ADD_USER: prefix + '/add',

  /**
   * 删除
   */
  DELETE_USER: prefix + '/delete/',

  /**
   * 更新
   */
  UPDATE_USER: prefix + '/update',

  /**
   * 获取详情
   */
  GET_USER_INFO: prefix + '/',
}
