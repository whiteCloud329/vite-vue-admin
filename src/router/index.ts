import { createRouter, createWebHistory } from 'vue-router'
import lyLayout from '@/layout/index.vue'
import { useTabsStore } from '@/store/modules/tabs.ts'

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'HomeView',
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
            ],
        },
        {
            path: '/demo',
            name: 'DemoView',
            component: lyLayout,
            children: [
                {
                    path: '',
                    name: 'ly-demo',
                    meta: {
                        title: 'demo页',
                        code: 'ly-demo',
                    },
                    component: () => import('@/views/demo.vue'),
                },
            ],
        },
        {
            path: '/demo1',
            name: 'Demo1View',
            component: lyLayout,
            children: [
                {
                    path: '',
                    name: 'ly-demo1',
                    meta: {
                        title: 'demo1页',
                        code: 'ly-demo1',
                    },
                    component: () => import('@/views/demo1.vue'),
                },
            ],
        },
    ],
    history: createWebHistory(),
})
// 使用 Pinia 的 setup 模式 store
router.beforeEach((to, from, next) => {
    const tabsStore = useTabsStore() // 获取 store
    if (to.meta.title) {
        tabsStore.addTab(to) // 路由切换时添加 tab
    }
    console.log(from)
    next()
})
export default router
