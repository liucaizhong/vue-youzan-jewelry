export default {
  userLogin (state, loginInfo) {
    state.login = {
      ...loginInfo,
    }
  },
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
}
