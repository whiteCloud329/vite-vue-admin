import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { LocationQuery, RouteLocationNormalized } from 'vue-router'
import router from '@/router'
import {
    LocationQueryRaw,
    RouteLocationAsPathGeneric,
    RouteLocationAsRelativeGeneric,
} from 'vue-router'

// 定义 Tab 类型

export interface TabType {
    title: string
    name?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric // 路由的 name
    query?: object | LocationQueryRaw
}

export const useTabsStore = defineStore(
    'tabsStore',
    () => {
        const defaultTab: TabType = {
            title: '首页',
            name: 'ly-home',
        }
        const tabs = ref<TabType[]>([])

        if (localStorage.getItem('tabs')) {
            tabs.value = JSON.parse(<string>localStorage.getItem('tabs'))
        } else {
            tabs.value.push(defaultTab)
        }
        // 页面刷新后从 localStorage 恢复 tabs
        // const activeTab = ref(localStorage.getItem('activeTab') || 'ly-home') // 默认激活的标签
        const activeTab = ref('')
        activeTab.value = localStorage.getItem('activeTab') || 'ly-home'

        // 添加或激活标签页
        const addTab = (nav: { name: string; query?: LocationQueryRaw }) => {
            // 判断code 是否为空
            if (!nav.name || nav.name === activeTab.value) return
            // 判断当前tabsList 里面是否存在
            const exists = tabs.value.some((tab) => tab.name === nav.name)
            if (!exists) {
                // 获取路由信息
                const route = router
                    .getRoutes()
                    .find((route) => nav.name === route.name)
                // 获取路由信息
                const tabRoute = {
                    title: route?.meta.title as string,
                    name: nav.name,
                    query: nav.query,
                }
                tabs.value.push(tabRoute)
                router.push({ name: nav.name, query: nav.query })
            } else {
                const tabNav = tabs.value.find((tab) => tab.name === nav.name)
                if (tabNav) {
                    if (nav.query) {
                        tabNav.query = nav.query || {}
                    }
                    router.push({
                        name: nav.name,
                        query: tabNav.query as LocationQueryRaw,
                    })
                }
            }
            setActiveTab(nav.name)
        }

        // 设置当前激活的标签页
        const setActiveTab = (name: string) => {
            activeTab.value = name
        }

        // 删除标签页
        const removeTab = (name: string) => {
            const index = tabs.value.findIndex((tab) => tab.name === name)
            tabs.value.splice(index, 1)
            localStorage.setItem('tabs', JSON.stringify(tabs.value)) // 保存标签状态
            if (activeTab.value === name && tabs.value.length > 0) {
                setActiveTab(<string>tabs.value[Math.max(0, index - 1)].name)
            }
        }

        // 关闭其他标签页（保留首页）
        const closeOtherTabs = (name: string) => {
            tabs.value = tabs.value.filter(
                (tab) => tab.name === name || tab.name === 'ly-home',
            )
            setActiveTab(name)
        }

        // 关闭所有标签页
        const closeAllTabs = () => {
            tabs.value = [defaultTab]
            activeTab.value = 'ly-home'
        }
        return {
            tabs,
            activeTab,
            addTab,
            setActiveTab,
            removeTab,
            closeOtherTabs,
            closeAllTabs,
        }
    },
    {
        persist: true,
    },
)
