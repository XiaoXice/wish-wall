// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import vueResource from 'vue-resource';
// import '../theme/index.css';
import router from './router'

import VueWechatTitle from 'vue-wechat-title';

Vue.use(VueWechatTitle)
import { Notification, Button, Row, Container, Header, Main, Footer, Input, Loading, Select, Option, Autocomplete, Card } from 'element-ui';
Vue.use(Button);
Vue.use(Row)
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Select);
Vue.use(Option);
Vue.use(Autocomplete);
Vue.use(Card);

Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;

import 'lib-flexible'

Vue.use(vueResource);

import store from './store';

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