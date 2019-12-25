
import API from '@/js/api'
import request from '@/js/request'
export default {
  /**
   * 用户登录
   */
  login (data) {
    return request({
      url: API.USER.LOGIN,
      method: 'post',
      data: data
    })
  },
  /**
   *  获取用户列表
   * */
  getUserList (params) {
    return request({
      url: API.USER.GET_USER_LIST,
      method: 'get',
      params: params
    })
  },
  addUser (data) {
    let url = API.USER.ADD_USER
    return request({
      url: url,
      method: 'post',
      data: data
    })
  },
  /***
   * 删除用户
   */
  deleteUser (data) {
    return request({
      url: API.USER.DELETE_USER + data._id,
      method: 'delete'
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo (_id) {
    let url = API.USER.GET_USER_INFO + _id
    return request({
      url: url,
      method: 'get'
    })
  },
  /**
   * 更新用户信息
   * @param data
   */
  updateUserInfo (data) {
    let url = API.USER.UPDATE_USER + data._id
    return request({
      url: url,
      method: 'put',
      data: data
    })
  }
}
