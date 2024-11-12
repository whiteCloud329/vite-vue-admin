import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const userInfo = reactive({
        name: 'admin',
        avatar: '',
        role: ['admin', 'normal'],
    })

    const menus = reactive([])
    const getMenus = () => {}
    return {
        userInfo,
        menus,
        getMenus,
    }
})
