
export const xxx = {
  state: {
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {

    }
  },
  actions: {
    /** 保存用户信息 */
    setUserInfo (state, user) {
      state.commit('setUserInfo', user)
    }
  }
}
export default xxx
