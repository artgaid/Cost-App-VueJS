import Vue from 'vue'
import Router from 'vue-router'



import PageDashboard from '../pages/PageDashboard.vue'
import Page404 from '../pages/Page404.vue'
import PageLogin from '../pages/PageLogin.vue'
// import PageAddPayment from '../pages/PageAddPayment.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: PageDashboard,
            name: 'dashboard'
        },
        {
            path: '/dashboard',
            component: PageDashboard,
            name: 'dashboard'
        },
        {
            path: '/dashboard/:pages',
            component: PageDashboard,
            name: 'dashboard'
        },
        {
            path: '/404',
            component: Page404,
            name: '404'
        },
        {
            path: '/add/payment/:Category',
            component: PageDashboard,
            name: 'addPayment'
        },
        {
            path: '/auth',
            component: PageLogin,
            name: 'login'
        },
        {
            path: '*',
            component: Page404,
        }
    ]
})

const isAuth = true;

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !isAuth) {
        next({ name: 'login' })
    } else {
        next()
    }
})

const getTitleByRouteName = routeName => {
    return {
        'dashboard': "Page Dashboard",
        '404': "Not Found"
    }[routeName]
}

router.afterEach((to) => {
    document.title = getTitleByRouteName(to.name)
})

export default router
