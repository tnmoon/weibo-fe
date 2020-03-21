export default {
  namespaced: true,
  state: {
    loginRegisterVisible: false,
    blogPublishVisible: false
  },
  mutations: {
    toggleLoginRegisterVisible (state) {
      state.loginRegisterVisible = !state.loginRegisterVisible
    },
    toggleBlogPublishVisible (state) {
      state.blogPublishVisible = !state.blogPublishVisible
    },
    setLoginRegisterVisible (state, visible) {
      state.loginRegisterVisible = visible
    },
    setBlogPublishVisible (state, visible) {
      state.blogPublishVisible = visible
    }
  }
}
