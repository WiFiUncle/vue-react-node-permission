
import API from '@/js/api'
import request from '@/js/request'
export default {
  /**
   * 用户登录
   */
  login(data) {
    return request({
      url: API.USER.LOGIN,
      method: 'post',
      data: data,
    })
  },
  /**
   *  获取用户列表
   * */
  getUserList (data) {
    return request({
      url: API.USER.GET_USER_LIST,
      method: 'post',
      data: data,
    })
  },
  addUser (data){
    let url = API.USER.ADD_USER;
    return request({
      url: url,
      method: 'post',
      data:data,
    })
  },
  /***
   * 删除用户
   */
  deleteUser(data){
    return request({
      url: API.USER.DELETE_USER + data.id,
      method: 'delete',
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo (params){
    let url = API.USER.GET_USER_INFO + params.id;
    return request({
      url: url,
      method: 'get',
    })
  },
  /**
   * 更新用户信息
   * @param data
   */
  updateUserInfo (data){
    let url = API.USER.UPDATE_USER;
    return request({
      url: url,
      method: 'post',
      data:data,
    })
  },
}
