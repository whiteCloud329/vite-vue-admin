import { createRouter, createWebHistory } from 'vue-router'
import lyLayout from '@/layout/index.vue'

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'viteAdmin',
            redirect: '/ly-home',
            component: lyLayout,
            children: [
                {
                    path: '',
                    name: 'ly-home',
                    meta: {
                        title: '首页',
                        code: 'ly-hone',
                    },
                    component: () => import('@/views/Home.vue'),
                },
                {
                    path: 'demo',
                    name: 'ly-demo',
                    meta: {
                        title: 'demo页',
                        code: 'ly-demo',
                    },
                    component: () => import('@/views/demo.vue'),
                },
                {
                    path: 'demo1',
                    name: 'ly-demo1',
                    meta: {
                        title: 'demo1页',
                        code: 'ly-demo1',
                    },
                    component: () => import('@/views/demo1.vue'),
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
    ],
    history: createWebHistory(),
})

// 使用 Pinia 的 setup 模式 store
// router.beforeEach((to, from, next) => {
//     const tabsStore = useTabsStore() // 获取 store
//     if (to.meta.title) {
//         tabsStore.addTab({ name: to.name as string, query: to.query }) // 路由切换时添加 tab
//     }
//     next()
// })
export default router
