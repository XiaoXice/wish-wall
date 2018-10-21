import Vue from 'vue'
import Router from 'vue-router'
import checkin from '@/components/checkin'
const survey = () =>
    import ('@/components/survey')
const find = () =>
    import ('@/components/find')
const statu = () =>
    import ('@/components/statu')
import store from "../store"

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'checkin',
        component: checkin
    }, {
        path: '/survey',
        name: 'survey',
        component: survey,
        beforeEnter(to, from, next) {
            if (store.state.power == 1) {
                next();
            } else {
                next('./')
            }
        }
    }, {
        path: '/find',
        name: 'find',
        component: find,
        beforeEnter(to, from, next) {
            if (store.state.power == 1) {
                next();
            } else {
                next('./')
            }
        }
    }, {
        path: '/statu',
        name: 'statu',
        component: statu,
        beforeEnter(to, from, next) {
            if (store.state.power == 2) {
                next();
            } else {
                next('./')
            }
        }
    }]
})