import YZGForm from './src/main.vue';

YZGForm.install = (Vue, options) => {
    Vue.component(YZGForm.name, YZGForm);
};

export default YZGForm;