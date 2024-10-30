import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { appStateType } from '@/types/app-types.ts'
import { setting } from '@/config/setting.ts'

export const useAppStore = defineStore(
    'appStore',
    () => {
        // 侧边栏是否折叠
        const appState = reactive<appStateType>({
            ...setting,
        })

        const toggleCollapse = () => {
            appState.isCollapse = !appState.isCollapse
        }
        const toggleFooter = () => {
            appState.isShowFooter = !appState.isShowFooter
        }

        // const setAppState = (key: string, value: string) => {
        //     appState[key as string] = value as keyof appStateType
        // }
        // const toggleState = (key: string) => {
        //     appState[key] = !appState[key]
        // }
        return {
            appState,
            toggleCollapse,
            toggleFooter,
            // setAppState,
            // toggleState,
        }
    },
    {
        persist: {
            storage: sessionStorage,
        },
    },
)
