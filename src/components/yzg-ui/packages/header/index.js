import Header from './src/main.vue';

Header.install = (Vue, options) => {
    Vue.component(Header.name, Header);
};

export default Header;

