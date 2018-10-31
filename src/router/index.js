import Vue from 'vue'
import Router from 'vue-router'
const survey = () =>
    import ('@/components/survey')
const find = () =>
    import ('@/components/find')
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'survey',
        component: survey,
    }, {
        path: '/find',
        name: 'find',
        component: find,
    }]
})