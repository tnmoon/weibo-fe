import { login, getUserDetail } from '@/api/account'
import cookiesUtil from '@/util/cookiesUtil'

export default {
  namespaced: true,
  state: {
    userId: null,
    userNickname: null,
    userIconUrl: null,
    fansCount: null,
    followCount: null,
    blogCount: null
  },
  getters: {
    hasLoggedin(state) {
      return state.userNickname &&
        state.userIconUrl &&
        state.userId &&
        state.fansCount !== null &&
        state.followCount !== null &&
        state.blogCount !== null
    }
  },
  actions: {
    async login({ dispatch }, { username = '', password = '' }) {
      try {
        const { token } = await login({ username, password })
        cookiesUtil.set('token', token) // Bearer是与后端约定好的token前缀，为帮助后端验证token合法性
        dispatch('load') // 加载用户详细数据
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    /**
     * 加载用户信息，包括用户的ID、昵称、头像
     *
     */
    async load({ state }) {
      const { userNickname, userIconUrl, userId, fansCount, followCount, blogCount } = await getUserDetail()

      state.userNickname = userNickname
      state.userIconUrl = userIconUrl
      state.userId = userId

      state.fansCount = fansCount
      state.followCount = followCount
      state.blogCount = blogCount
    }
  },

  /**
   * 登陆接口需要与后端确认用户信息正确与否
   * 注销则无需与后端沟通，直接删除本地的用户数据即可
   */
  mutations: {
    logout() {
      cookiesUtil.remove('token')
    }
  }
}
