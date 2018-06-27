import { LAZYLOADOPTIONS } from '@/constant'
import { Loading, DatetimePicker, Field, Button, Search, Swipe, SwipeItem,
  Popup, Tabbar, TabbarItem, PullRefresh, Toast, Lazyload, Collapse,
  CollapseItem, List, Picker, RadioGroup, Radio, Card, CellGroup,
  Cell, Switch, Area, Tab, Tabs, Checkbox, Dialog } from 'vant'

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
    Vue.use(Picker)
    Vue.use(RadioGroup).use(Radio)
    Vue.use(Card)
    Vue.use(Cell).use(CellGroup)
    Vue.use(Switch)
    Vue.use(Area)
    Vue.use(Tab).use(Tabs)
    Vue.use(Checkbox)
    Vue.use(Dialog)
    Vue.prototype.$dialog = Dialog
  }
}
