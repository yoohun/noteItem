import Auth from '../../api/auth'

const state = {
  userData: {},

}
// 相当于computed
const getters = {
  userName: state => state.userData.userName || '未',
  isLogin: state => state.userData.isLogin
}

const mutations = {
  setUserData(state, payload) {
    state.userData = payload.userData
  }
}

const actions = {
  getUserInfo({ commit }) {
    return Auth.getInfo()
      .then(res => {
        commit('setUserData', { userData: res })
      })
  },
  logout({ commit }) {
    return Auth.logout()
      .then(res => {
        commit('setUserData', { userData: {} })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
