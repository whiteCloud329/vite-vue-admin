import { createRouter, createWebHistory } from 'vue-router'
import lyLayout from '@/layout/index.vue'

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: lyLayout,
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: () => import('@/views/Home.vue'),
                },
            ],
        },
        {
            path: '/demo',
            name: 'DemoView',
            component: () => import('@/views/demo.vue'),
        },
    ],
    history: createWebHistory(),
})

export default router
