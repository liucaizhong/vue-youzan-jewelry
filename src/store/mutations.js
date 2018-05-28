export default {
  userLogin (state, loginInfo) {
    state.login = {
      ...loginInfo,
    }
  },
  updateGlobalLoading (state, loading) {
    state.loading = loading
  },
}
