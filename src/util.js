import axios from 'axios'

export default {
  install (Vue, options) {
    Vue.prototype.$getCookie = function (name) {
      if (document.cookie.length > 0) {
        let start = document
          .cookie
          .indexOf(name + '=')
        if (start !== -1) {
          start = start + name.length + 1
          let end = document
            .cookie
            .indexOf(';', start)
          if (end === -1) {
            end = document.cookie.length
          }
          return decodeURIComponent(document.cookie.substring(start, end))
        }
      }
      return ''
    }

    Vue.prototype.$setCookie = function (name, value, expiredays) {
      const exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = name + '=' + encodeURIComponent(value) + ((expiredays === null)
        ? ''
        : ';expires=' + exdate.toGMTString())
    }

    Vue.prototype.$getLocalStorage = function (key) {
      const localStorage = window.localStorage
      return localStorage.getItem(key)
    }

    Vue.prototype.$setLocalStorage = function (key, value) {
      const localStorage = window.localStorage
      try {
        localStorage.setItem(key, value)
      } catch (e) {
        console.log(e)
        return false
      }
      return true
    }

    Vue.prototype.$roundTo2Decimal = function (number) {
      return Math.round(number * 100) / 100
    }

    Vue.prototype.$fetch = function (url, config = {}, loading) {
      loading && this.$store.commit('updateGlobalLoading', true)
      const baseUrl = '/api-auth'
      const realUrl = baseUrl + url
      const mergeConfig = (!config.method || config.method === 'get')
        ? Object.assign({
          url: realUrl,
          method: 'get',
          params: {
            limit: 10,
            offset: 0,
          },
          withCredentials: true,
        }, config)
        : Object.assign({
          url: realUrl,
          // method: 'post',
          withCredentials: true,
        }, config)

      return new Promise((resolve, reject) => {
        const request = async () => {
          try {
            const rsp = await axios(mergeConfig)
            resolve(rsp)
            // dispatch action to synchronus mine tab
            if (mergeConfig.method !== 'get' &&
              ['/client/UserLogin/', '/common/payment/', '/client/bindphone',
                '/client/RentalService/', '/client/SellService/', '/client/ComboService/',
                '/client/verifyphone/', '/client/RentalService/buy/', '/common/order/',
                '/client/perfectinfo/'].includes(url)) {
              console.log('fetch', url)
              this.$store.dispatch('getUserInfo')
            }
          } catch (err) {
            // todo: error handle
            console.error(err)
            reject(err)
          }
          loading && this.$store.commit('updateGlobalLoading', false)
        }

        request()
      })
    }

    Vue.prototype.$message = function ({ duration = 1500, ...args }) {
      this.$store.commit('showMessage', {
        ...args,
      })

      setTimeout(() => {
        this.$store.commit('hideMessage')
      }, duration)
    }
  },
}
