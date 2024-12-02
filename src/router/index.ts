import { createRouter, createWebHistory } from 'vue-router'
// import { useTabsStore } from '@/store/modules/tabs.ts'
import staticRouters from '@/router/static.ts'
import { dynamicRouters } from '@/router/dynamic.ts'

const router = createRouter({
    routes: [...staticRouters, ...dynamicRouters],
    history: createWebHistory(),
})
// 全局路由守卫动态注入布局
// const excludedRoutes = ['/login', '/403', '404'] // 排除的路由
// // 使用 Pinia 的 setup 模式 store
// router.beforeEach((to, from, next) => {
//     const tabsStore = useTabsStore() // 获取 store
//     if (to.meta.title) {
//         tabsStore.addTab({ name: to.name as string, query: to.query }) // 路由切换时添加 tab
//     }
//     if (!excludedRoutes.includes(to.path)) {
//     }
//     next()
// })
export default router
