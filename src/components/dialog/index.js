import vue from 'vue';
// 这里就是我们刚刚创建的那个静态组件
import toastComponent from './toast.vue';
import alertComponent from './alert.vue';
import loadingComponent from './loading.vue';

// 自定义弹窗
import ScratchCardRules from './custom/scratchCardRules.vue';
import LogoutValueInfo from './custom/logoutValueInfo.vue';

// 返回一个 扩展实例构造器
const ToastConstructor = vue.extend(toastComponent);
const AlertConstructor = vue.extend(alertComponent);
const LoadingConstructor = vue.extend(loadingComponent);

function preventDefault(e) {
    e.preventDefault();
};


let toastDom;
// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showToast(text, duration = 2000) {
    // 实例化一个 toast.vue
    toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                show: true
            }
        }
    });  // 把 实例化的 toast.vue 添加到 body 里
    document.body.appendChild(toastDom.$el);  // 过了 duration 时间后隐藏
    setTimeout(() => {
        toastDom.show = false;
    }, duration);
}


let alertDom;
function hideAlert(dom) {
    dom.show = false;
    document.body.className = "";
}

function showAlert(params) {
    // type (0:Alert 1:Confirm)
    let { isConfirm, title = '提示', custom, customData, text = '', confirm = '确认', cancel = '取消', isClose = false, confirmCallback = () => { }, cancelCallback = () => { } } = (typeof params == 'string' ? { text: params } : params);
    const close = () => {
        hideAlert(alertDom);
    };
    const confirmCall = () => {
        close();
        confirmCallback && confirmCallback();
    };
    const cancelCall = () => {
        close();
        cancelCallback && cancelCallback();
    };
    const datas = Object.assign({ show: true }, { isConfirm, title, custom, customData, text, confirm, cancel, confirmCallback: confirmCall, cancelCallback: cancelCall, isClose, close: close });

    alertDom = new AlertConstructor({
        el: document.createElement('div'),
        data() {
            return datas
        },
        components: {
            ScratchCardRules,
            LogoutValueInfo
        },
        methods: {
            preventDefault
        }
    });
    document.body.appendChild(alertDom.$el);
    document.body.className = "oh";
}

let loadingDom;
function showLoading(text) {
    // 实例化一个 toast.vue
    loadingDom = new LoadingConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                show: true
            }
        },
        methods: {
            preventDefault
        }
    });  // 把 实例化的 toast.vue 添加到 body 里
    document.body.appendChild(loadingDom.$el);  // 过了 duration 时间后隐藏
}

function hideLoading() {
    loadingDom.text = '';
    loadingDom.show = false;
}

// 注册为全局组件的函数
function registryDialog() {  // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    const dialog = {
        toast: showToast,
        alert: showAlert,
        loading: showLoading,
        hideLoading: hideLoading
    }
    vue.prototype.$dialog = dialog
}

export default registryDialog;



