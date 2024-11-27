<template>
    <div>
        <component :is="asideTheme" v-bind="{ menuTree }"></component>
        {{ asideTheme }}
    </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app.ts'
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user.ts'

defineOptions({ name: 'ly-aside' })
const appStore = useAppStore()
const appAsideTheme = computed(() => appStore.appAsideTheme)
type ThemeKey = 'default' | 'top' | 'normal'

const themeMap: { [key in ThemeKey]: string } = {
    default: 'ly-aside-default',
    top: 'ly-aside-top',
    normal: 'ly-aside-normal',
}

const asideTheme = computed(() => {
    const theme = appAsideTheme.value
    return themeMap[theme as ThemeKey] || 'ly-aside-default'
})

useUserStore().getMenus()

const menuTree = computed(() => useUserStore().menus)
console.log(menuTree)
</script>
<style scoped lang="scss"></style>
