import lyLayout from '@/layout/index.vue'

export default [
    {
        path: '/',
        name: 'ly-home',
        redirect: '/',
        component: lyLayout,
        children: [
            {
                path: '',
                name: 'ly-home',
                meta: {
                    title: '首页',
                    code: 'ly-home',
                },
                component: () => import('@/views/Home.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/system/login/index.vue'),
    },
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/system/error/403.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/system/error/404.vue'),
    },
]
