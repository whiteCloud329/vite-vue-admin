import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
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

        // 侧边栏主题设置
        // appAsideTheme 用于存储当前侧边栏的主题，默认为 'default'
        const appAsideTheme = ref<string>('default')

        /**
         * 设置侧边栏主题
         * @param theme 要设置的主题名称，可选值为 'default', 'top', 'normal'
         *              default --- 默认主题
         *              top     --- 顶部主题
         *              normal  --- 传统主题
         */
        const setAppAsideTheme = (theme: string) => {
            appAsideTheme.value = theme
        }
        return {
            appState,
            appAsideTheme,
            toggleCollapse,
            toggleFooter,
            setAppAsideTheme,
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
