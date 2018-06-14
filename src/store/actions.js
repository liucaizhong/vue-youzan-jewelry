import axios from 'axios'

const fetch = function (url, config = {}) {
  const baseUrl = '/api-auth'
  const realUrl = baseUrl + url
  const mergeConfig = Object.assign({
    url: realUrl,
    method: 'get',
    withCredentials: true,
  }, config)

  return new Promise((resolve, reject) => {
    const request = async () => {
      try {
        const rsp = await axios(mergeConfig)
        console.log('actions get', rsp)
        resolve(rsp)
      } catch (err) {
        // todo: error handle
        console.error(err)
        reject(err)
      }
    }

    request()
  })
}

export default {
  async getUserInfo ({ commit }) {
    const { data } = await fetch('/client/GetUserInfo/')
    commit('updateUserInfo', data)
  },
}
