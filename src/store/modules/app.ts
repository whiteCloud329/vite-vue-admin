import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('appStore', () => {
    const isCollapse = ref(false) // 是否折叠面板
    return { isCollapse }
})
