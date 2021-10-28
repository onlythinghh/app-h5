import Vue from 'vue'
import Main from './main.vue'
let ToastConstructor = Vue.extend(Main)

let instance
let timer
let times = 3000

const close = () => {
  instance.visible = false
  instance = null
  window.clearTimeout(timer)
}

const Toast = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  const { timeout = times } = options

  if (instance) {
    const { message } = options
    instance.message = message
  } else {
    instance = new ToastConstructor({
      data: options
    })

    instance.$mount()

    document.body.appendChild(instance.$el)

    instance.visible = true
  }
  if (timer) {
    window.clearTimeout(timer)
  }
  timer = setTimeout(close, timeout)
  return instance
}

Toast.close = close

export default Toast
