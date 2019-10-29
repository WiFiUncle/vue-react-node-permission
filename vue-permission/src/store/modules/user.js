import requestData from '@/js/service/index'

export default {
  state: {
    /* token: getToken(), */
    userInfo: {}
  },
  mutations: {
  },
  actions: {
    // 登录
    login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        requestData.USER.login(params).then(rsp => {
          sessionStorage.userInfo = JSON.stringify(rsp.data)
          resolve(rsp)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo ({ commit }, params) {
      return new Promise((resolve, reject) => {
        requestData.USER.getUserInfo(params).then(rsp => {
          sessionStorage.userInfo = JSON.stringify(rsp.data)
          resolve(rsp)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
