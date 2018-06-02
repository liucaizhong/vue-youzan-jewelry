import { LAZYLOADOPTIONS } from '@/constant'
import { Loading, DatetimePicker, Field, Button, Search, Swipe, SwipeItem,
  Popup, Tabbar, TabbarItem, PullRefresh, Toast, Lazyload, Collapse,
  CollapseItem, List } from 'vant'

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
    Vue.use(Lazyload, LAZYLOADOPTIONS)
    Vue.use(Collapse).use(CollapseItem)
    Vue.use(List)
  }
}
