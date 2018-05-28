import { Loading, DatetimePicker, Field, CellGroup, Button } from 'vant'

export default {
  init (Vue) {
    Vue.use(Loading)
    Vue.use(DatetimePicker)
    Vue.use(Field)
    Vue.use(CellGroup)
    Vue.use(Button)
  }
}
