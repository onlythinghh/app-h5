import YZGRadio from './src/main.vue';

YZGRadio.install = (Vue, options) => {
    Vue.component(YZGRadio.name, YZGRadio);
}

export default YZGRadio;