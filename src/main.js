// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import vueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

import 'lib-flexible'
import VueWechatTitle from 'vue-wechat-title';

Vue.use(VueWechatTitle)
import { Container, Header, Main, Footer, Input, Loading, Select, Option, Autocomplete, Card } from 'element-ui';
let element = { Container, Header, Main, Footer, Input, Loading, Select, Option, Autocomplete, Card };
for (const iterator of element) Vue.use(iterator)

Vue.use(vueResource);

import './store';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    render: h => h(App)
})