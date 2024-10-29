<template>
    <div>
        我是一个demo
        <el-button @click="onRouter('ly-home')">跳转首页</el-button>
        <el-button @click="onRouter('ly-demo1', 2)">跳转demo1</el-button>
    </div>
</template>
<script setup lang="ts">
import { useTabsStore } from '@/store/modules/tabs.ts'

defineOptions({ name: 'lyDemo' })
const tabsStore = useTabsStore()
const onRouter = (name: string, id?: number) => {
    tabsStore.addTab({
        name: name,
        query: {
            id: id,
        },
    })
}
</script>
<style scoped lang="scss"></style>
