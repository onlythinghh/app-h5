import YZGSelect from './src/main.vue';

YZGSelect.install = (Vue, options) => {
    Vue.components(YZGSelect.name, YZGSelect);
};

export default YZGSelect;