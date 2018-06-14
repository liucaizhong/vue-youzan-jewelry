export default {
  updateGlobalLoading (state, loading) {
    state.loading = loading
  },
  showMessage (state, { position = 'top', ...args }) {
    state.message = {
      show: true,
      position,
      ...args,
    }
  },
  hideMessage (state) {
    state.message = {
      show: false,
    }
  },
  updateUserInfo (state, userInfo) {
    state.userInfo = Object.assign({}, state.userInfo, userInfo)
  },
}
