import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     component: () => import(/* webpackChunkName:"Login" */'../pages/PageLogin.vue'),
        //     name: 'login'
        // },
        {
            path: '/',
            component: () => import(/* webpackChunkName:"Dashboard" */'../pages/PageDashboard.vue'),
            name: 'dashboard'
        },
        {
            path: '/dashboard',
            component: () => import(/* webpackChunkName:"Dashboard" */'../pages/PageDashboard.vue'),
            name: 'dashboard'
        },
        {
            path: '/dashboard/:pages',
            component: () => import(/* webpackChunkName:"Dashboard" */'../pages/PageDashboard.vue'),
            name: 'dashboard'
        },
        {
            path: '/about*',
            component: () => import(/* webpackChunkName:"About" */'../pages/PageAbout.vue'),
            name: 'about'
        },
        {
            path: '/404',
            component: () => import(/* webpackChunkName:"404" */'../pages/Page404.vue'),
            name: '404'
        },
        {
            path: '/add/payment/:Category',
            component: () => import(/* webpackChunkName:"AddPaymentFormUrl" */'../pages/PageDashboard.vue'),
            name: 'addPaymentFormUrl'
        },
        {
            path: '/calculator',
            component: () => import( /* webpackChunkName:"Calculator" */ '../pages/PageCalculator.vue'),
            name: 'calculator'
        },
        {
            path: '*',
            component: () => import(/* webpackChunkName:"404" */'../pages/Page404.vue'),
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
