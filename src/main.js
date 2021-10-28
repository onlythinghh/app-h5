import Vue from 'vue'
// import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'
import dialog from './components/dialog'
import yzgs from './components/yzg-ui'
import { Popup, Cell, Checklist, Picker, DatetimePicker, Radio } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './tools/iscroll-lite'

Vue.component(Popup.name, Popup)
Vue.component(Cell.name, Cell)
Vue.component(Checklist.name, Checklist)
Vue.component(Picker.name, Picker)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Radio.name, Radio)

Vue.config.productionTip = false
window.yzg = {}

// if ('addEventListener' in document) {
//   document.addEventListener(
//     'DOMContentLoaded',
//     function () {
//       FastClick.attach(document.body)
//     },
//     false
//   )
// }

Vue.use(dialog)
Vue.use(yzgs)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  listenEvents: ['scroll']
})

new Vue({
  router,
  store
}).$mount('#app')
