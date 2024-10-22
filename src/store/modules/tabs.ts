import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LocationQuery, RouteLocationNormalized } from 'vue-router'

// 定义 Tab 类型

interface Tab {
    title: string
    path: string // 与路由 path 绑定
    name?: string // 路由的 name
    query?: LocationQuery
}

export const useTabsStore = defineStore(
    'tabsStore',
    () => {
        const defaultTab: Tab = {
            title: '首页', // 默认首页标题
            path: '/', // 默认首页路径
        }

        const tabs = ref<Tab[]>(
            JSON.parse(localStorage.getItem('tabs') || '[]'),
        ) // 页面刷新后从 localStorage 恢复 tabs
        const activeTab = ref(localStorage.getItem('activeTab') || '/') // 默认激活的标签

        // 添加或激活标签页
        const addTab = (route: RouteLocationNormalized) => {
            const tab: Tab = {
                title: route.meta.title as string, // 从路由元数据获取标题
                path: route.path,
                name: route.name as string,
                query: route.query,
            }
            const exists = tabs.value.some((t) => t.path === route.path)
            if (!exists) {
                tabs.value.push(tab)
            }
            setActiveTab(route.path)
        }

        // 设置当前激活的标签页
        const setActiveTab = (path: string) => {
            activeTab.value = path
        }

        // 删除标签页
        const removeTab = (path: string) => {
            const index = tabs.value.findIndex((tab) => tab.path === path)
            if (index !== -1) {
                tabs.value.splice(index, 1)
                localStorage.setItem('tabs', JSON.stringify(tabs.value)) // 保存标签状态
                if (activeTab.value === path && tabs.value.length > 0) {
                    setActiveTab(tabs.value[Math.max(0, index - 1)].path)
                }
            }
        }

        // 关闭其他标签页（保留首页）
        const closeOtherTabs = (path: string) => {
            tabs.value = tabs.value.filter(
                (tab) => tab.path === path || tab.path === '/',
            )
            setActiveTab(path)
        }

        // 关闭所有标签页
        const closeAllTabs = () => {
            tabs.value = [defaultTab]
            activeTab.value = '/'
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
