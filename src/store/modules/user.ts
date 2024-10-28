import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const userInfo = reactive({
        name: 'admin',
        avatar: '',
    })
    return {
        userInfo,
    }
})
