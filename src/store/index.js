import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
    state: {
        title: "北邮心愿墙",
        DocTitle: "北邮心愿墙",
        obj: null,
        dataBase: null,
        idx: null
    }
})