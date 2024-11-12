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
        tabs.value.push(defaultTab)
        const activeTab = ref('')
        activeTab.value = 'ly-home'
        const historyTabs = ref([])
        // 添加或激活标签页
        const addTab = (nav: { name: string; query?: LocationQueryRaw }) => {
            // 判断code 是否为空
            if (
                !nav.name ||
                (nav.name === activeTab.value && nav.name !== 'ly-home')
            )
                return
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
            historyTabs.value = historyTabs.value.filter(
                (item) => item !== nav.name,
            )
            historyTabs.value.push(nav.name as never)
            setActiveTab(nav.name)
        }

        // 设置当前激活的标签页
        const setActiveTab = (name: string) => {
            activeTab.value = name
        }

        // 删除标签页
        /**
         * 关闭标签页并更新历史标签页列表
         *
         * 此函数旨在移除当前打开的标签页列表中的指定标签页，同时从历史标签页列表中移除它
         * 如果移除后仍有历史标签页，则跳转到最后一个历史标签页；否则，跳转到首页
         *
         * @param name 要关闭的标签页的名称
         */
        const removeTab = (name: string) => {
            // 查找并移除当前标签页列表中的指定标签页
            const index = tabs.value.findIndex((tab) => tab.name === name)
            if (index !== -1) tabs.value.splice(index, 1)

            // 查找并移除历史标签页列表中的指定标签页
            const historyIndex = historyTabs.value?.indexOf(name as never)
            if (historyIndex !== -1) historyTabs.value.splice(historyIndex, 1)

            // 获取历史标签页列表中的最后一个标签页名称
            const lastTabName = historyTabs.value[historyTabs.value.length - 1]
            // 根据最后一个标签页名称查找对应的标签页对象
            const lastTab = tabs.value.find((item) => item.name === lastTabName)

            // 如果找到最后一个标签页，则跳转到该标签页，否则跳转到首页
            if (lastTab) {
                router.push({
                    name: lastTab.name as string,
                    query: lastTab.query as LocationQueryRaw,
                })
                setActiveTab(lastTab.name as string)
            } else {
                router.push({ name: 'ly-home' })
                setActiveTab('ly-home')
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
            historyTabs,
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
