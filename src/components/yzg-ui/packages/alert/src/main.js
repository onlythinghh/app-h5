import Vue from 'vue';
import Main from './main.vue';
let AlertConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Alert = (options) => {
    if (typeof options == 'string') {
        options = {
            message: options
        }
    }

    let id = `alert_${seed++}`;

    instance = new AlertConstructor({
        data: options
    });

    instance.id = id;

    instance.$mount();

    document.body.appendChild(instance.$el);

    instance.visible = true;

    instances.push(instance);

    return instance;
}


Alert.closeAll = () => {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }

}

export default Alert;