import { Loading, DatetimePicker, Field, Button, Search, Swipe, SwipeItem,
  Popup, Tabbar, TabbarItem, PullRefresh, Toast } from 'vant'

export default {
  init (Vue) {
    Vue.use(Loading)
    Vue.use(DatetimePicker)
    Vue.use(Field)
    Vue.use(Popup)
    Vue.use(Button)
    Vue.use(Tabbar).use(TabbarItem)
    Vue.use(Search)
    Vue.use(Swipe).use(SwipeItem)
    Vue.use(PullRefresh)
    Vue.use(Toast)
    Vue.prototype.$toast = Toast
  }
}
