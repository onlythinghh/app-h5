import Header from './packages/header'
import YZGInput from './packages/input'
import YZGSelect from './packages/select'
import YZGPopSelect from './packages/pop-select'
import YZGCheckbox from './packages/checkbox'
import YZGRadio from './packages/radio'
import YZGForm from './packages/form'
import Alert from './packages/alert'
import Toast from './packages/toast'
import Loading from './packages/loading'

const version = '1.0.1'

const components = [
  Header,
  YZGInput,
  YZGSelect,
  YZGPopSelect,
  YZGCheckbox,
  YZGRadio,
  YZGForm
]

const install = (Vue, options) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$alert = Alert
  Vue.prototype.$toast = Toast
  Vue.prototype.$closeToast = Toast.close
  Vue.prototype.$loading = Loading
  Vue.prototype.$closeLoading = Loading.close
}

export default {
  version,
  install,
  Header,
  YZGInput,
  YZGSelect,
  YZGPopSelect,
  YZGCheckbox,
  YZGRadio,
  YZGForm,
  Alert
}
