import { createRouter, createWebHistory } from 'vue-router'
// import { useTabsStore } from '@/store/modules/tabs.ts'
import staticRouters from '@/router/static.ts'
import { dynamicRouters } from '@/router/dynamic.ts'
// import { getToken } from '@/utils/auth.ts'
import { useUserStore } from '@/store/modules/user.ts'
import { useTabsStore } from '@/store/modules/tabs.ts'

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

router.beforeEach(async (to, from, next) => {
    console.log('beforeEach', to, from, next)
    if (to.path === '/login') {
        return next()
    }
    if (useUserStore().menus.length === 0) {
        await useUserStore()
            .getMenus()
            .then(() => {
                next()
            })
        return
        // if (
        //     !useTabsStore().activeTab ||
        //     useTabsStore().activeTab !== 'ly-home'
        // ) {
        //     useTabsStore().addTab({
        //         name: useTabsStore().activeTab,
        //     }) // 路由切换时添加 tab
        //     next()
        // }
    }
    // if (!useTabsStore().activeTab && useTabsStore().activeTab !== 'ly-home') {
    //     return useTabsStore().addTab({
    //         name: to.name as string,
    //         query: to.query,
    //     }) // 路由切换时添加 tab
    // }
    console.info(
        '🚀 ~ file:app.vue method:getMenus() line: -----',
        !useTabsStore().activeTab || useTabsStore().activeTab !== 'ly-home',
    )
    // if (!getToken()) {
    //     return next({ path: '/login', query: { redirect: to.fullPath } })
    // }
    // // 重置路由
    // else {
    //     next({ path: '/login' })
    // }
    next()
})
export default router
