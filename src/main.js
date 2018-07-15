// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import util from './util'
import scrollFix from './scrollFix'
import { i18n, loadLanguageAsync } from './i18n.config'
// import VueI18n from 'vue-i18n'
import vantConfig from './vant.config'
// import Vant from 'vant'
// import 'vant/lib/vant-css/index.css'

Vue.config.productionTip = false
Vue.use(util)
Vue.use(scrollFix)
// Vue.use(Vant)
// Vue.use(VueI18n)
vantConfig.init(Vue)

// get lang
const lang = navigator.language
loadLanguageAsync(lang)

// set root font-size and make rem effective immediately
// const setRootFontSize = (doc, win) => {
//   const docEl = doc.documentElement
//   const resizeEvt = 'orientationchange' in window
//     ? 'orientationchange'
//     : 'resize'
//   const recalc = () => {
//     const clientWidth = docEl.clientWidth
//     if (!clientWidth) {
//       return
//     }

//     docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
//   }

//   if (!doc.addEventListener) {
//     return
//   }

//   win.addEventListener(resizeEvt, recalc, false)
//   doc.addEventListener('DOMContentLoaded', recalc, false)
// }

// setRootFontSize(document, window)

// 设置路由拦截
router.beforeEach((to, from, next) => {
  store.commit('updateGlobalLoading', true)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Vue.prototype.$getCookie('logged') === '0') {
      console.log('logged in')
      next()
    } else {
      console.log('redirect login')
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  store.commit('updateGlobalLoading', false)
})

// 设置axios interceptor
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回401,跳转到登录页面
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        // case 302:
        //   console.log('error.response.status', error.response)
        //   const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3cf20ba95498ed2a&redirect_uri=http://5rtkfg.natappfree.cc/account/oauth/authorize/?next=/&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirect'
        //   window.location.href = url
        //   break
      }
    }
    return Promise.reject(error.response.data)
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
