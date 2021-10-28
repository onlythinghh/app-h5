import Vue from 'vue'
import Main from './main.vue'
let LoadingConstructor = Vue.extend(Main)

let instance

const close = () => {
  instance.visible = false
  instance = null
}

const Loading = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  if (instance) {
    const { message } = options
    instance.message = message
  } else {
    instance = new LoadingConstructor({
      data: options
    })

    instance.$mount()

    document.body.appendChild(instance.$el)

    instance.visible = true
  }

  return instance
}

Loading.close = close

export default Loading
