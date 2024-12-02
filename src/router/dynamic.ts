import { RouteRecordSingleView } from 'vue-router'

export const dynamicRouters: RouteRecordSingleView[] = [
    {
        path: '/demo1List/add',
        name: 'ly-demo1-add',
        meta: {
            title: '新增demo',
            code: 'ly-demo1-add',
        },
        component: () => import('@/views/demos/demo1/add/index.vue'),
    },
]
