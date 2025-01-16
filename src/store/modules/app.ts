import { defineStore } from 'pinia'

interface AppState {
    sidebar: {
        collapsed: boolean
    }
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        sidebar: {
            collapsed: false,
        },
    }),
    actions: {
        toggleSidebar() {
            this.sidebar.collapsed = !this.sidebar.collapsed
        },
    },
    persist: true,
})
