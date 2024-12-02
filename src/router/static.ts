import { RouteRecordSingleView } from 'vue-router'

const staticRouters: RouteRecordSingleView[] = [
    {
        path: '/',
        name: 'ly-home',
        meta: {
            title: '首页',
            code: 'ly-home',
        },
        component: () => import('@/views/Home.vue'),
    },
    // demo 页面
    {
        path: '/demo',
        name: 'ly-demo',
        meta: {
            title: 'demo页',
            code: 'ly-demo',
        },
        component: () => import('@/views/demo.vue'),
    },
    {
        path: '/demo1',
        name: 'ly-demo1',
        meta: {
            title: 'demo1页',
            code: 'ly-demo1',
        },
        component: () => import('@/views/demo1.vue'),
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            layout: false,
            title: '登录',
            code: 'ly-login',
        },
        component: () => import('@/views/system/login/index.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            layout: false,
            title: '权限不足',
            code: 'ly-403',
        },
        component: () => import('@/views/system/error/403.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: {
            layout: false,
            title: '404',
            code: 'ly-404',
        },
        component: () => import('@/views/system/error/404.vue'),
    },
]
export default staticRouters
