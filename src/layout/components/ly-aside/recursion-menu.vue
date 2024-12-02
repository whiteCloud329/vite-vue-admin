<template>
    <template v-for="item in menu as MenuItemType[]" :key="item.id">
        <el-sub-menu
            v-if="item.children && item.children.length"
            :index="String(item.id)"
        >
            <template #title>
                {{ item.name }}
            </template>
            <recursion-menu :menu="item.children"></recursion-menu>
        </el-sub-menu>
        <el-menu-item
            v-else
            :index="String(item.id)"
            :class="isActive(item) ? 'menu-item__active' : ''"
            @click="onMenuClick(item)"
        >
            <div>
                {{ item.name }}
            </div>
        </el-menu-item>
    </template>
</template>
<script setup lang="ts">
import { MenuItemType } from '@/types/app-types.ts'
import { useTabsStore } from '@/store/modules/tabs.ts'
import { useRoute } from 'vue-router'

defineOptions({ name: 'recursion-menu' })
defineProps({
    menu: { type: Array, default: () => [] },
})
const tabsStore = useTabsStore()
const onMenuClick = (item: MenuItemType) => {
    tabsStore.addTab({ name: item.name })
}
const route = useRoute()

const isActive = (item: MenuItemType) => {
    return route.path.includes(item.path as string)
}
</script>
<style scoped lang="scss"></style>
