<template>
    <el-result title="403" sub-title="对不起，您没有权限访问此内容">
        <template #extra>
            <el-button type="primary" @click="goHome"> 返回首页</el-button>
        </template>
    </el-result>
</template>
<script setup lang="ts">
import { useTabsStore } from '@/store/modules/tabs.ts'

defineOptions({ name: 'error-403' })

const tabStore = useTabsStore()
const goHome = () => {
    tabStore.addTab({ name: 'ly-home' })
}
</script>
<style scoped lang="scss"></style>
