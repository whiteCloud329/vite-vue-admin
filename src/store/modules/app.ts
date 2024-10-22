import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface appStateType {
    isCollapse: boolean
}

export const useAppStore = defineStore('appStore', () => {
    // 侧边栏是否折叠
    const appState = reactive<appStateType>({
        isCollapse: false,
    })

    const toggleCollapse = () => {
        appState.isCollapse = !appState.isCollapse
    }

    return {
        appState,
        toggleCollapse,
    }
})
