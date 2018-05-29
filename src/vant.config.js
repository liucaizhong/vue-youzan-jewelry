import { Loading, DatetimePicker, Field, Button, Search,
  Popup, Tabbar, TabbarItem } from 'vant'

export default {
  init (Vue) {
    Vue.use(Loading)
    Vue.use(DatetimePicker)
    Vue.use(Field)
    Vue.use(Popup)
    Vue.use(Button)
    Vue.use(Tabbar).use(TabbarItem)
    Vue.use(Search)
  }
}
