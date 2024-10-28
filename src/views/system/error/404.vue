<template>
    <el-result title="404" sub-title="对不起，您访问的内容不存在！">
        <template #extra>
            <el-button type="primary" @click="$router.push('/')">
                返回首页
            </el-button>
        </template>
    </el-result>
</template>
<script setup lang="ts">
defineOptions({ name: 'error-403' })
</script>
<style scoped lang="scss"></style>
