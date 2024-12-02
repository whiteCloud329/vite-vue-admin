<template>
    <div>
        我是demo1list
        <el-button @click="handleClick">新增</el-button>
    </div>
</template>
<script setup lang="ts">
import { useTabsStore } from '@/store/modules/tabs.ts'

defineOptions({ name: 'ly-demo1-list' })

const handleClick = () => {
    useTabsStore().addTab({ name: 'ly-demo1-add' })
}
</script>
<style scoped lang="scss"></style>
