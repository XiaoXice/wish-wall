import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
    state: {
        title: "北邮心愿墙",
        power: 0,
        adminUserName: '',
        beginTime: '',
        endTime: '',
        name: "", //姓名
        number: '',
        school: '', // 学院
        class: '', //学院
        phone: '',
        score: 0,
        DocTitle: "北邮心愿墙"
    },
    mutations: { // 这里的方法必须同步！
        switch_dialog(state) { //这里的state对应着上面这个state
            state.show = state.show ? false : true;
            //你还可以在这里执行其他的操作改变state
        },
        // 调用方式：$store.commit('<modelsName>/switch_dialog')
        increment(state, payload) { // 这是一个可以传参数(真名:载荷-payload)的方法
            state.nick_name = payload.nick_name // 传进来的参数可以是对象
        }
        // 调用方式: $store.commit('<modelsName>/increment', {nick_name: 'asdf'})
        // 或: $store.commit({type:'<modelsName>/increment', nick_name: 'asdf'})
    },
    actions: { //这里放异步操作
        switch_dialog(context) { //这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('switch_dialog');
            //你还可以在这里触发其他的mutations方法
        },
        // 调用方式: $store.dispatch('<modelsName>/switch_dialog')
    },
    getters: { // state的派生属性
        not_show(state) { //这里的state对应着上面这个state
            return !state.show;
        }
        // 调用: $store.getters.not_show
        // 这就像一个值一样，不用加括号进行调用
    }
})